import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  flag_forms = false;
        svg;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.create_menu(this.svg);
    window.onresize = () => { d3.selectAll('svg').remove(); this.create_menu(this.svg)};}
 create_menu(svg) {
  
  let margin = {top: window.innerHeight / 2, right: window.innerWidth / 2, bottom: window.innerHeight / 2, left: window.innerWidth / 2};
  let width = window.innerWidth;
  let height = window.innerHeight;
   if (!this.flag_forms) {

       // tslint:disable-next-line: align
      this.svg = d3.select('body')
       .append('svg')
       .attr('id', 'principal')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom)
       .append('g')
       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      let self = this;

      const v = [];
      for (let i = 0; i < 10; i++) {
        v.push({r: Math.floor(Math.random() * window.screen.height / 30 ) + window.screen.height / 40, c: 'rgb(60,' + 0 + ',' + (Math.floor(Math.random() * 255 ) + 10) + ')'});
    }
    
      let flag = false;
      const node = this.svg.selectAll('circle')
    .data(v)
    .enter()
    .append('circle')
    .attr('r', (d) => d.r)
    .style('fill', (d) => d.c);

      this.svg.append('circle')
    .attr('r', window.screen.height / 6)
    .attr('id', 'centro')
    .style('fill', 'rgb(0, 153, 255)');

    
    
    
    // tslint:disable-next-line: align
    this.svg.append('svg:image')
        .attr('xlink:href', '../../assets/thefee.png')
        .attr('x', -100)
        .attr('y', -100)
        .attr('id', 'logotipo')
        .on('click', () => {
        if (!flag) {
        if(window.screen.width > 600 ){    
         this.svg.append('circle')
        .attr('r', 60)
        .attr('id', 'reg')
        .attr('cx', 0)
        .attr('cy', 0)
        .style('fill', 'rgb(0, 0, 0)')
        .transition()
        .duration(500)
        .style('fill', 'rgb(102, 0, 51)')
        .attr('transform', 'translate(250,0) rotate(90)')
        .attr('cx', 200);

         this.svg
        .append('svg:image')
        .attr('xlink:href', '../../assets/.formpng')
        .attr('x', 200)
        .attr('y', 150)
        .attr('width', 100)
        .attr('height', 100)
        .attr('id', 'img_form')
        .style('opacity', 0)
        .on('mouseover', function() {
            d3.select(this).attr('width', 110).attr('height', 110).attr('x', 195).attr('y', 145);
        })
        .on('mouseleave', function() {
            d3.select(this).attr('width', 100).attr('height', 100).attr('x', 200).attr('y', 150);
        })
        .on('click', () => {
                            self.contract_menu();
                            d3.forceSimulation(v)
.force('charge', d3.forceManyBody().strength(-1000))
.on('tick', ticked);
                            d3.select('#centro')
.transition()
.duration(500)
.style('opacity', 0)
.remove();
                            d3.select('#logotipo')
.transition()
.duration(500)
.style('opacity', 0)
.remove();
                            d3.select('#principal')
.transition()
.duration(500)
.on('end',() => {self.router.navigateByUrl('/register');})
.style('opacity', 0)
.remove();})
        .transition()
        .duration(1000)
        .style('opacity', 1);

         this.svg.append('circle')
        .attr('r', 60)
        .attr('id', 'login')
        .attr('cx', 0)
        .attr('cy', 0)
        .transition()
        .duration(500)
        .style('fill', 'rgb(102, 0, 51)')
        .attr('transform', 'translate(-250,0) rotate(90)')
        .attr('cx', -200);

         this.svg
        .append('svg:image')
        .attr('xlink:href', '../../assets/login.png')
        .attr('x', -300)
        .attr('y', -250)
        .attr('width', 100)
        .attr('height', 100)
        .attr('id', 'img_login')
        .style('opacity', 0)
        .on('mouseover', function() {
            d3.select(this).attr('width', 110).attr('height', 110).attr('x', -305).attr('y', -255);
        })
        .on('mouseleave', function() {
            d3.select(this).attr('width', 100).attr('height', 100).attr('x', -300).attr('y', -250);
        })
        .on('click', () => {
                            self.contract_menu();
                            d3.forceSimulation(v)
                .force('charge', d3.forceManyBody().strength(-1000))
                .on('tick', ticked);
                            d3.select('#centro')
               .transition()
               .duration(500)
               .style('opacity', 0)
               .remove();
                            d3.select('#logotipo')
               .transition()
               .duration(500)
               .style('opacity', 0)
               .remove();
                            d3.select('#principal')
            .transition()
            .duration(500)
            .on('end',() => {self.router.navigateByUrl('/login');})
            .style('opacity', 0)
            .remove();

        })
        .transition()
        .duration(1000)
        .style('opacity', 1);







        }else{
          this.svg.append('circle')
          .attr('r', 40)
          .attr('id', 'reg')
          .attr('cx', 0)
          .attr('cy', 0)
          .style('fill', 'rgb(0, 0, 0)')
          .transition()
          .duration(500)
          .style('fill', 'rgb(102, 0, 51)')
          .attr('transform', 'translate(0,200)');

          this.svg
        .append('svg:image')
        .attr('xlink:href', '../../assets/form.png')
        .attr('x', -25)
        .attr('y', 175)
        .attr('width', 50)
        .attr('height', 50)
        .attr('id', 'img_form')
        .style('opacity', 0)
        .on('click', () => {
                           // self.contract_menu_v2();
                            d3.forceSimulation(v)
.force('charge', d3.forceManyBody().strength(-1000))
.on('tick', ticked);
                            d3.select('#centro')
.transition()
.duration(500)
.style('opacity', 0)
.remove();
                            d3.select('#logotipo')
.transition()
.duration(500)
.style('opacity', 0)
.remove();
                            d3.select('#principal')
.transition()
.duration(500)
.on('end',() => {self.router.navigateByUrl('/register');})
.style('opacity', 0)
.remove();})
        .transition()
        .duration(1000)
        .style('opacity', 1);

          this.svg.append('circle')
        .attr('r', 40)
        .attr('id', 'login')
        .attr('cx', 0)
        .attr('cy', 0)
        .transition()
        .duration(500)
        .style('fill', 'rgb(102, 0, 51)')
        .attr('transform', 'translate(0,-200)')
        

          this.svg
        .append('svg:image')
        .attr('xlink:href', '../../assets/login.png')
        .attr('x', -37)
        .attr('y', -237)
        .attr('width', 75)
        .attr('height', 75)
        .attr('id', 'img_login')
        .style('opacity', 0)
        .on('click', () => {
                           
                            d3.forceSimulation(v)
                .force('charge', d3.forceManyBody().strength(-1000))
                .on('tick', ticked);
                            d3.select('#centro')
               .transition()
               .duration(500)
               .style('opacity', 0)
               .remove();
                            d3.select('#logotipo')
               .transition()
               .duration(500)
               .style('opacity', 0)
               .remove();
                            d3.select('#principal')
            .transition()
            .duration(500)
            .on('end',() => {self.router.navigateByUrl('/login');})
            .style('opacity', 0)
            .remove();

        })
        .transition()
        .duration(1000)
        .style('opacity', 1);




  
        }

        flag = true;
        } else {
            this.contract_menu();
            flag = false;
        }
    });



      const simulation = d3.forceSimulation(v)
          .force('charge', d3.forceManyBody().strength(-20))
          .on('tick', ticked);

      function ticked() {
            node
                 .attr('cx', (d) =>  (d.x + 6) )
                 .attr('cy', (d) =>  (d.y - 6) );
    }}}




 contract_menu() {
    d3.select('#login')
           .transition()
           .duration(500)
           .style('fill', 'rgb(0, 0, 0)')
           .attr('transform', 'translate(0,0) rotate(-90)')
           .attr('cx', 0)
           .remove();
    d3.select('#reg')
           .transition()
           .duration(500)
           .style('fill', 'rgb(0, 0, 0)')
           .attr('transform', 'translate(0,0) rotate(-90)')
           .attr('cx', 0)
           .remove();
    d3.select('#img_login')
            .transition()
            .duration(100)
            .style('opacity', '100')
            .remove();
    d3.select('#img_form')
            .transition()
            .duration(100)
            .style('opacity', '100')
            .remove();
}
contract_menu_v2() {
  d3.select('#login')
         .transition()
         .duration(500)
         .style('fill', 'rgb(0, 0, 0)')
         .attr('transform', 'translate(0,0) rotate(-90)')
         .attr('cx', 0)
         .remove();
  d3.select('#reg')
         .transition()
         .duration(500)
         .style('fill', 'rgb(0, 0, 0)')
         .attr('transform', 'translate(0,0) rotate(-90)')
         .attr('cx', 0)
         .remove();
  d3.select('#img_login')
          .transition()
          .duration(100)
          .style('opacity', '100')
          .remove();
  d3.select('#img_form')
          .transition()
          .duration(100)
          .style('opacity', '100')
          .remove();
}

}

