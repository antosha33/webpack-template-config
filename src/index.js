import Post from './post';
import '@styles/main.css';
import json from './assets/json.json';
import WebpackLogo from './assets/webpack.png';
import * as $ from 'jquery';
import './babel';
import './typescript';

const post = new Post('webpack course',WebpackLogo);

const unused = 44;


$('pre').html(post.toString())

console.log(post.toString());
console.log( json);

