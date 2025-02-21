const {createApp, ref} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

const app = createApp({
    components: {
        alumno,
        materia,
        matricula, // Registrar el nuevo componente
        buscaralumno,
        buscarmateria,
        buscarmatricula // Si decides crear un componente de búsqueda para matrículas
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                buscarAlumno: {mostrar: false},
                materia: {mostrar: false},
                buscarMateria: {mostrar: false},
                matricula: {mostrar: false}, // Mostrar/ocultar el formulario de matrícula
                buscarMatricula: {mostrar: false} // Mostrar/ocultar la búsqueda de matrículas
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
            matriculas: '++idMatricula, alumnoSeleccionado, fecha, periodo' // Nueva tabla para matrículas
        });
    }
});
app.mount('#app');