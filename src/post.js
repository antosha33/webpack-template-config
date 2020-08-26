export default function Post(title, img) {
  this.title = title;
  this.date = new Date();
  this.img = img
}

Post.prototype.toString = function () {
  return JSON.stringify({
    title: this.title,
    date: this.date.toJSON(),
    img: this.img
  },null, 5)
}