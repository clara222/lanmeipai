//处理标题
function sliceTitle(title, start, end) {
  if (title.length > end) {
    title = title.substr(start, end) + '...';
  }
  return title;

}
//处理星星
function getStarArr(star) {
  var num = star.substr(0, 1);
  var starArr = [];
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      starArr[i] = 1;
    } else {
      starArr[i] = 0;
    }
  }
  return starArr;

}
//演员名字用/隔开
function castsNametoString(cast) {
  var castsName = '';
  for (var i = 0; i < cast.length; i++) {
    castsName += cast[i].name+' / ';
  }
  castsName = castsName.substr(0, castsName.length-3);
  return castsName;
}
//电影类型用/隔开
function genresToString(genres) {
  var genreMovie = '';
  for (var i = 0; i < genres.length; i++) {
    genreMovie += genres[i] + ' / ';
  }
  genreMovie = genreMovie.substr(0, genreMovie.length - 3);
  return genreMovie;
}
//处理演员头像和名字
function getCastsInfo(cast) {
  var casts = [];
  for (var i = 0; i < cast.length; i++) {
    var obj = {};
    obj["name"] = cast[i].name;
    obj["avatar"] = cast[i].avatars.large;
    casts.push(obj);
  }
  return casts;
}

module.exports = {
  sliceTitle: sliceTitle,
  getStarArr: getStarArr,
  castsNametoString: castsNametoString,
  getCastsInfo: getCastsInfo,
  genresToString: genresToString
};