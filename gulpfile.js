const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const del = require("del");
const path = require("path");
const fs = require("fs");
const replaceCommon = require("gulp-replace-common");

const src = "./src/";
const dist = "./dist/";

const config = {
    files: dist + "**/*.*",
    html: {
        src: dist + "**/*.html",
        dest: dist
    },
    css: {
        src: dist + "css/**/*.css",
        dest: dist + "css"
    },
    scss: {
        src: [src + "scss/**/*.scss", src + "sass/**/*.scss"],
        dest: dist + "css"
    }
};

var dir = __dirname.split("\\").reverse()[0].toLowerCase();
if (dir != 'h5' && dir != 'pc') {
    dir = (path.normalize(__dirname + "\\..")).split("\\").reverse()[0].toLowerCase();
}
const browsers = dir == 'h5' ? ['last 10 versions'] : ['last 100 versions'];

function errorHandler() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "错误了",
        message: "<%=error.message %>"
    }).apply(this, args);
    this.emit();
}

function argsHandler(ext) {
    var file = '';
    var globalFile = '';
    var isReverse = false;
    process.argv.forEach(function(arg) {
        if (arg.indexOf("--") === 0) {
            globalFile = arg.substring(2);
        }
        if (arg == "-reverse") {
            isReverse = true;
        }
    });
    if (globalFile) {
        switch (ext) {
            case 'scss':
                file = globalFile.indexOf(".scss") > -1 ? globalFile : globalFile+".scss";
                file = [src + "scss/**/" + file, src + "sass/**/" + file];
                break;
            case 'css':
                file = globalFile.indexOf(".css") > -1 ? globalFile : globalFile +".css";
                file = dist + "css/**/" + file;
                break;
            case 'html':
                file = globalFile.indexOf(".html") > -1 ? globalFile : globalFile +".html";
                file = dist + "**/" + file;
                break;
        }
    } else {
        switch (ext) {
            case 'scss':
                file = config.scss.src;
                break;
            case 'css':
                file = config.css.src;
                break;
            case 'html':
                file = config.html.src;
                break;
        }
    }
    return {file: file, isReverse: isReverse};
}

gulp.task("default", ["watch"], function() {
    console.log("\
                   _ooOoo_\n\
                  o8888888o\n\
                  88\" . \"88\n\
                  (| -_- |)\n\
                  O\\  =  /O\n\
               ____/`---'\\____\n\
             .'  \\\\|     |//  `.\n\
            /  \\\\|||  :  |||//  \\\n\
           /  _||||| -:- |||||-  \\\n\
           |   | \\\\\\  -  /// |   |\n\
           | \\_|  ''\\---/''  |   |\n\
           \\  .-\\__  `-`  ___/-. /\n\
         ___`. .'  /--.--\\  `. . __\n\
      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".\n\
     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |\n\
     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /\n\
======`-.____`-.___\\_____/___.-`____.-'======\n\
                   `=---='\n\
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\
         佛祖保佑       永无BUG\n\
    ");
});

// 浏览器自动刷新 (gulp watch)
gulp.task("watch", function() {
    var exists = fs.existsSync(dist + "index.html");
    browserSync.init({
        server: {
            baseDir: dist,
            directory: !exists
        },
        open: "external",
        notify: false
    });
    gulp.watch(config.scss.src, ["sass"]);
    gulp.watch(config.files).on("change", function() {
        setTimeout(browserSync.reload, 100);
    });
});

// sass编译成css (gulp sass)
gulp.task("sass", function() {
    var filepath = argsHandler("scss").file;
    return gulp.src(filepath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", errorHandler)
        .pipe(autoprefixer({
            browsers: browsers
        }))
        .pipe(cleanCSS({ compatibility: 'ie8', keepBreaks: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(config.scss.dest));
});

// 替换global里的公共文件
gulp.task("replace", ['autoprefixer'], function() {
    del("dist/css/maps");
    var args = argsHandler("html");
    var filepath = args.file;
    var isReverse = args.isReverse;
    var dirpath = filepath.indexOf("**/") > -1 ? config.html.dest : path.dirname(filepath);
    return gulp.src(filepath)
        .pipe(replaceCommon({reverse: isReverse}))
        .pipe(gulp.dest(dirpath));
});

// css添加webkit,moz等前缀 (gulp autoprefixer)
gulp.task("autoprefixer", function() {
    var filepath = argsHandler("css").file;
    return gulp.src(filepath)
        .pipe(autoprefixer({
            browsers: browsers
        }))
        .pipe(cleanCSS({ compatibility: 'ie8', keepBreaks: false }))
        .pipe(gulp.dest(config.css.dest));
});

// 压缩CSS (gulp cssmin)
gulp.task("cssmin", function() {
    var filepath = argsHandler("css").file;
    return gulp.src(filepath)
        .pipe(cleanCSS({ compatibility: 'ie8', keepBreaks: false }))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('help', function() {
    console.log("------------------------------------------------------------");
    console.log("   gulp                          自动刷新并编译所有sass文件");
    console.log("   gulp watch                    自动刷新并编译所有sass文件");
    console.log("   gulp watch --file             自动刷新并编译指定sass文件");
    console.log("   gulp sass                     编译sass文件");
    console.log("   gulp sass --file              编译指定file文件");
    console.log("   gulp autoprefixer             添加webkit等前缀");
    console.log("   gulp autoprefixer --file      添加webkit等前缀");
    console.log("   gulp cssmin                   压缩CSS");
    console.log("   gulp cssmin --file            压缩指定file文件");
    console.log("   gulp replace                  替换global下公共文件");
    console.log("   gulp replace -reverse         逆替换global下公共文件");
    console.log("   gulp replace --file           指定file文件替换global下公共文件");
    console.log("   gulp replace -reverse --file  指定file文件逆替换global下公共文件");
    console.log("------------------------------------------------------------");
});