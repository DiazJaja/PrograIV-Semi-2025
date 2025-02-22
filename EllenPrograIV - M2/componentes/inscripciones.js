const inscripcion = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idInscripcion: '',
            alumnoSeleccionado: null, // Almacena el ID del alumno seleccionado
            fecha: '', // Fecha de inscripción
            materias: [], // Lista de materias disponibles
            alumnos: [] // Lista de alumnos para el selector
        };
    },
    methods: {
        buscarInscripcion() {
            this.forms.buscarInscripcion.mostrar = !this.forms.buscarInscripcion.mostrar;
            this.$emit('buscar');
        },
        modificarInscripcion(inscripcion) {
            this.accion = 'modificar';
            this.idInscripcion = inscripcion.idInscripcion;
            this.alumnoSeleccionado = inscripcion.alumnoSeleccionado;
            this.fecha = inscripcion.fecha;
            // Marcar las materias inscritas
            this.materias.forEach(materia => {
                materia.inscrito = inscripcion.materias.some(m => m.idMateria === materia.idMateria);
            });
        },
        guardarInscripcion() {
            // Crear un objeto simple para guardar en IndexedDB
            let inscripcion = {
                alumnoSeleccionado: this.alumnoSeleccionado,
                fecha: this.fecha,
                materias: this.materias
                    .filter(m => m.inscrito) // Solo las materias seleccionadas
                    .map(m => ({ idMateria: m.idMateria, codigo: m.codigo, nombre: m.nombre })) // Solo datos simples
            };

            if (this.accion == 'modificar') {
                inscripcion.idInscripcion = this.idInscripcion;
            }

            // Guardar en la base de datos
            db.inscripciones.put(inscripcion)
                .then(() => {
                    alertify.success('Inscripción guardada correctamente.');
                    this.nuevaInscripcion(); // Reiniciar el formulario
                })
                .catch(error => {
                    console.error("Error al guardar la inscripción:", error);
                    alertify.error('Error al guardar la inscripción.');
                });
        },
        nuevaInscripcion() {
            this.accion = 'nuevo';
            this.idInscripcion = '';
            this.alumnoSeleccionado = null;
            this.fecha = '';
            this.materias.forEach(m => m.inscrito = false); // Reiniciar las materias seleccionadas
        },
        cargarAlumnos() {
            // Cargar la lista de alumnos desde la base de datos
            db.alumnos.toArray().then(alumnos => {
                this.alumnos = alumnos;
            }).catch(error => {
                console.error("Error al cargar alumnos:", error);
            });
        },
        cargarMaterias() {
            // Cargar la lista de materias desde la base de datos
            db.materias.toArray().then(materias => {
                this.materias = materias.map(m => ({ ...m, inscrito: false })); // Agregar propiedad "inscrito"
            }).catch(error => {
                console.error("Error al cargar materias:", error);
            });
        },
        inscribirMateria(materia) {
            materia.inscrito = !materia.inscrito; // Cambiar el estado de inscripción
        }
    },
    mounted() {
        this.cargarAlumnos();
        this.cargarMaterias();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmInscripcion" name="frmInscripcion" @submit.prevent="guardarInscripcion">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Inscripciones</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ALUMNO</div>
                                <div class="col-9 col-md-6">
                                    <select v-model="alumnoSeleccionado" class="form-control" required>
                                        <option v-for="alumno in alumnos" :key="alumno.idAlumno" :value="alumno.idAlumno">
                                            {{ alumno.nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">FECHA</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="fecha" type="date" class="form-control" required>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header bg-secondary text-white">Materias Disponibles</div>
                                        <div class="card-body">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Código</th>
                                                        <th>Nombre</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="materia in materias" :key="materia.idMateria">
                                                        <td>{{ materia.codigo }}</td>
                                                        <td>{{ materia.nombre }}</td>
                                                        <td>
                                                            <button @click.prevent="inscribirMateria(materia)" class="btn" :class="{'btn-success': !materia.inscrito, 'btn-danger': materia.inscrito}">
                                                                {{ materia.inscrito ? 'Desinscribir' : 'Inscribir' }}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarInscripcion" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};