module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'olsen.oddbjorn@gmail.com',
                password: '***REMOVED***',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        copy: {
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**','!**/ScreepsAutocomplete-master/**'],
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g,'.');
                    }
                }]
            },
        },
        uglify: {
            my_target: {
                files: {
                    'dest/output.min.js': ['src/**']
                }
            }
        }
    });



    grunt.registerTask('default',['copy','screeps']);
};