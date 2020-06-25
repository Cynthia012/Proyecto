import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { GetlogService } from '../getlog.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  data_categories = [{ desc: 'Memes', x: 1, y: 10 }, { desc: 'Libros', x: 2, y: 9 }, { desc: 'Ciencia', x: 3, y: 3 }, { desc: 'Niños', x: 4, y: 20 }, { desc: 'Autos', x: 5, y: 15 }, { desc: 'social', x: 6, y: 40 }]
  data_graph = { 'nodes': [{ 'id': '1', 'name': 'Willyre' }, { 'id': '2', 'name': 'tumadre' }], 'links': [{ 'source': '2', 'target': '1' }] };
  // tslint:disable-next-line: max-line-length
  growing = [{ date: '18/05/2020', users: 2 }, { date: '19/05/2020', users: 2 }, { date: '20/05/2020', users: 3 }, { date: '21/05/2020', users: 10 }, { date: '22/05/2020', users: 15 }, { date: '23/05/2020', users: 30 }, { date: '24/05/2020', users: 25 }, { date: '25/05/2020', users: 26 }];
  // Banderas
  flag = false;
  expanded_flag = false;
  user_flag = false;
  barr_flag = false;
  ojiva_flag = false;
  graph_flag = false;
  grow_flag = false;
  category_flag = false;

  persona1 = '';
  persona2 = '';
  categoria = '';
  visitados = '';
  fecha = '';
  usuarios = '';

  constructor(private getLog: GetlogService,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private router: Router,
              private authService: AuthService) {
    let user = this.authService.getUser();
    this.ngZone.run(() => {
      if (user) {
        if (user.uid === 'IAYkVfVARNUUVdOvOSFkBeFlwpj1') {
          this.flag = true;
        } else {
          this.flag = false;
          this.router.navigate(['/theFee']);
        }
      } else {
        this.router.navigate(['/theFee']);
      }
    });
  }
  mostrar() {
    document.getElementById('boton').classList.toggle('change');
    if (!this.expanded_flag) {
      d3.select('#responsiveBar')
        .transition()
        .duration(500)
        .style('width', '100%')
        .on('end', () => { d3.select('#perfil').style('display', 'inline'); d3.select('#stadistics').style('display', 'inline'); });
      this.expanded_flag = true;
    } else {
      d3.select('#perfil').style('display', 'none'); d3.select('#stadistics').style('display', 'none');
      d3.select('#responsiveBar')
        .transition()
        .duration(500)
        .style('width', '0%');
      this.expanded_flag = false;
    }
  }
  ngOnInit(): void { }

  showGraph() {
    if (!this.graph_flag) {
      this.graph_flag = true;
      this.grow_flag = false;
      this.category_flag = false;
      d3.selectAll('svg').remove();
      // Crear el objeto SVG
      // tslint:disable-next-line: one-variable-per-declaration
      const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;
      const svg = d3.select('#content')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      // Guardar el contexto
      let context = this;
      // Crer enlaces
      const link = svg
        .selectAll('line')
        .data(this.data_graph.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa')
        .style('stroke-width', '2')
        .on('mouseover', function (e) {
          d3.select(this).
            style('stroke', 'rgb(238, 255, 0)').
            style('stroke-width', '4');
          context.display_users(e.source, e.target);
        })
        .on('mouseleave', function (e) {
          context.user_flag = false;
          d3.select(this).
            style('stroke', '#aaa').
            style('stroke-width', '2');
        })
        .on('click', function (e) {
          if (window.screen.width < 768) {
            this.user_flag = true;
            context.display_users(e.source, e.target);
          }
        });
      // Crear Nodos
      const node = svg
        .selectAll('circle')
        .data(this.data_graph.nodes)
        .enter()
        .append('circle')
        .attr('r', 15)
        .style('fill', 'rgb(0,187,56)');
      // Simulación de fuerzas para animación
      const simulation = d3.forceSimulation(this.data_graph.nodes)
        .force('link', d3.forceLink()
          .id((d) => d.id)
          .links(this.data_graph.links))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', ticked);
      function ticked() {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        node
          .attr('cx', (d) => (d.x + 6))
          .attr('cy', (d) => (d.y - 6));
      }
    }
  }
  display_users(source, target) {
    this.user_flag = true;
    this.persona1 = source.name;
    this.persona2 = target.name;
  }
  // Gráfica de barras
  showBarr() {
    if (!this.category_flag) {
      this.category_flag = true;
      this.grow_flag = false;
      this.graph_flag = false;
      d3.selectAll('svg').remove();
      // tslint:disable-next-line: one-variable-per-declaration
      const margin = { top: 10, right: 50, bottom: 30, left: 40 },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

      const svg = d3.select('#content')
        .append('svg')
        .style('transform', 'rotate(180deg)')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



      let origen = { x: window.screen.width / 2, y: 50 };
      let context = this;
      const barr = svg
        .selectAll('rect')
        .data(this.data_categories)
        .enter()
        .append('rect')
        .attr('width', '30')
        .attr('height', '0')
        .attr('x', (d) => { origen.x -= 40; return origen.x; })
        .attr('y', (d) => '300')
        .style('fill', '#00BDFF')
        .on("mouseover", function (e) {
          d3.select(this).
            style('fill', '#e6eeff');
          context.barr_flag = true;
          context.categoria = e.desc;
          context.visitados = e.y;
        })
        .on("mouseleave", function (e) {
          d3.select(this).
            style('fill', '#00BDFF');
          context.barr_flag = false;
        })
        .on('click', function (e) {
          if (window.screen.width < 768) {
            context.barr_flag = true;
            context.categoria = e.desc;
            context.visitados = e.y;
          }
        })
        .transition().duration(1000).attr("height", (d) => d.y * 10);
    }
  }
  // Ojiva
  show_growing() {
    if (!this.grow_flag) {
      this.category_flag = false;
      this.grow_flag = true;
      this.graph_flag = false;
      d3.selectAll('svg').remove();
      // tslint:disable-next-line: one-variable-per-declaration
      const margin = { top: 10, right: 50, bottom: 30, left: 40 },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

      const svg = d3.select('#content')
        .append('svg')
        .style('transform', 'rotate(180deg)')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      let origen = { x: window.screen.width / 2, y: 50 };
      let context = this;
      const node = svg.selectAll('circle')
        .data(this.growing)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', (d) => { origen.x -= 50; return origen.x })
        .attr('cy', (d) => ((d.users * 10) + 500))
        .style('fill', 'rgb(182, 0, 70)')
        .on('mouseover', function (e) {
          d3.select(this).attr('r', 10);
          context.ojiva_flag = true;
          context.fecha = e.date;
          context.usuarios = e.users;
        })
        .on('mouseleave', function (e) {
          d3.select(this).attr('r', 5);
          context.ojiva_flag = false;
        })
        .on('click', function (e) {
          if (window.screen.width < 768) {
            context.ojiva_flag = true;
            context.fecha = e.date;
            context.usuarios = e.users;
          }
        });


      console.log(node);
      for (let i = 0; i < node._groups[0].length - 1; i++) {

        svg
          .append('line')
          .style('stroke', '#910048')
          .style('stroke-width', '2')
          .attr('x1', (d) => node._groups[0][i].getAttribute('cx'))
          .attr('x2', (d) => node._groups[0][i + 1].getAttribute('cx'))
          .attr('y1', (d) => node._groups[0][i].getAttribute('cy'))
          .attr('y2', (d) => node._groups[0][i + 1].getAttribute('cy'));
      }
    }
  }
}