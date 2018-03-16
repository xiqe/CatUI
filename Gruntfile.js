module.exports = function(grunt){
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
                app:'cat_ui/',
                dest:'../../FEX/Resources/CatUI/'
        },

        less: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= config.app %>base/css/',
                        src: ['*.less'],
                        dest: '<%= config.app %>base/css/',
                        ext: '.css'
                    }]
                }
        },

        concat: {
                css: {
                    src: ['<%= config.app %>**/*.css'],
                    dest: '<%= config.dest %>bulid-public/CatUI.css'
                },

                js: {
                    src: ['<%= config.app %>**/*.js'],
                    dest: '<%= config.dest %>bulid-public/CatUI.js'
                }
        },


        imagemin: {
                pub: {
                    options: {
                        optimizationLevel: 3
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.dest %>bulid-public/img/',
                            cwd: '<%= config.dest %>bulid-public/img/',
                            src: ['*.{jpg,png,gif}'],
                            dest: '<%= config.dest %>md5/img/'
                        }
                    ]
                }
        },

        uglify: {
                options:{
                    banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                js:{
                    files:[
                        {
                            expand:true,
                            cwd:'<%= config.dest %>bulid-public/',
                            src:['*.js'],
                            dest:'<%= config.dest %>md5/',
                            ext: '.min.js'
                        }
                    ]
                }
        },

        cssmin: {
                options:{
                    banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    beautify:{
                        ascii_only:true
                    },
                    compatibility : 'ie8',
                    noAdvanced : true
                },
                css:{
                    files:[
                        {
                            expand:true,
                            cwd:'<%= config.dest %>bulid-public/',
                            src:['*.css'],
                            dest:'<%= config.dest %>md5/',
                            ext: '.min.css'
                        }
                    ]
                }
        },

        rev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 8
                },

                assets: {
                    files: [{
                        src: [
                            '<%= config.dest %>md5/*.{js,css}',
                            '<%= config.dest %>md5/img/*.{jpg,png,gif}'
                        ]
                    }]
                }
        },

        usemin: {
                css: {
                    files:[{
                      src: ['<%= config.dest %>md5/*.css']
                    }]
                },
                options:{
                    filePrefixer:function(url){
                        if(!url){
                            return '';
                        }
                        return url.replace('img/','<%=request.getContextPath()%>');
                    },
                    patterns: {
                        css: [
                            [/(img\.png)/, 'Replacing reference to img.png']
                        ]
                    }
                }
        },

        copy: {
                pubImg: {
                    cwd: '<%= config.app %>',
                    src: ['**/**/*.{jpg,png,gif}', '**/**/**/*.{jpg,png,gif}'],
                    dest: '<%= config.dest %>bulid-public/img',
                    expand: true,
                    flatten:true,
                    filter: 'isFile'
                },
                pubRes: {
                    cwd: '<%= config.dest %>md5/',
                    src: ['*.{js,css}'],
                    dest: '<%= config.dest %>',
                    expand: true,
                    flatten:true,
                    filter: 'isFile'
                },
                pubResImg: {
                    cwd: '<%= config.dest %>md5/img/',
                    src: ['*.{jpg,png,gif}'],
                    dest: '<%= config.dest %>img/',
                    expand: true,
                    flatten:true,
                    filter: 'isFile'
                }
        },

        clean: {
            all: ['<%= config.dest %>bulid-public/','<%= config.dest %>md5/'],
            options: {
                force: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-less');
 
    grunt.registerTask('catui',['less','concat','copy:pubImg','uglify:js','cssmin:css','imagemin:pub','copy:pubRes','copy:pubResImg','clean']);

};