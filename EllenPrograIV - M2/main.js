const {createApp, ref} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

    const app = createApp({
        components: {
            alumno,
            materia,
            matricula,
            inscripcion,
            buscaralumno,
            buscarmateria,
            buscarmatricula,
            buscarinscripcion // Registrar el nuevo componente
        },
        data() {
            return {
                forms : {
                    alumno: {mostrar: false},
                    buscarAlumno: {mostrar: false},
                    materia: {mostrar: false},
                    buscarMateria: {mostrar: false},
                    matricula: {mostrar: false},
                    buscarMatricula: {mostrar: false},
                    inscripcion: {mostrar: false},
                    buscarInscripcion: {mostrar: false} // Mostrar/ocultar la búsqueda de inscripciones
                },
            };
        },
        methods: {
            buscar(form, metodo) {
                this.$refs[form][metodo]();
            },
            abrirFormulario(componente) {
                this.forms[componente].mostrar = !this.forms[componente].mostrar;
            },
            modificar(form, metodo, datos) {
                this.$refs[form][metodo](datos);
            }
        },
        created() {
            db.version(1).stores({
                alumnos: '++idAlumno, codigo, nombre, direccion, telefono, email',
                materias: '++idMateria, codigo, nombre, uv',
                matriculas: '++idMatricula, alumnoSeleccionado, fecha, periodo',
                inscripciones: '++idInscripcion, alumnoSeleccionado, fecha, materias' // Nueva tabla para inscripciones
            });
        }
    });
app.mount('#app');