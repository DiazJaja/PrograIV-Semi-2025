const { createApp } = Vue;

createApp({
    data() {
        return {
            mostrarPantallaInicial: true, // Controla qué pantalla se muestra
            alumnos: [], // Lista de alumnos
            codigo: '',
            nombre: '',
            direccion: '',
            municipio: '',
            distrito: '',
            telefono: '',
            fechaNacimiento: '',
            sexo: '',
            reproduciendo: false // Estado de la música
        };
    },
    methods: {
        guardarAlumno() {
            // Verificar si ya existe el alumno con el mismo código
            let alumnoExistente = localStorage.getItem(this.codigo);

            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                municipio: this.municipio,
                distrito: this.distrito,
                telefono: this.telefono,
                fechaNacimiento: this.fechaNacimiento,
                sexo: this.sexo
            };

            if (alumnoExistente) {
                // Si el alumno ya existe, actualizar solo si hay cambios
                let alumnoGuardado = JSON.parse(alumnoExistente);
                if (
                    alumnoGuardado.nombre !== this.nombre ||
                    alumnoGuardado.direccion !== this.direccion ||
                    alumnoGuardado.municipio !== this.municipio ||
                    alumnoGuardado.distrito !== this.distrito ||
                    alumnoGuardado.telefono !== this.telefono ||
                    alumnoGuardado.fechaNacimiento !== this.fechaNacimiento ||
                    alumnoGuardado.sexo !== this.sexo
                ) {
                    // Solo actualizar si hay cambios
                    localStorage.setItem(this.codigo, JSON.stringify(alumno));
                    this.listarAlumnos();
                    this.limpiarFormulario();
                } else {
                    alert('No se realizaron cambios. Los datos no se actualizaron.');
                }
            } else {
                // Si el alumno no existe, guardar nuevo alumno
                localStorage.setItem(this.codigo, JSON.stringify(alumno));
                this.listarAlumnos();
                this.limpiarFormulario();
            }
        },

        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                try {
                    let alumno = JSON.parse(valor);
                    this.alumnos.push(alumno);
                } catch (e) {
                    console.error("Error al parsear los datos de alumno", e);
                }
            }
        },

        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.municipio = alumno.municipio;
            this.distrito = alumno.distrito;
            this.telefono = alumno.telefono;
            this.fechaNacimiento = alumno.fechaNacimiento;
            this.sexo = alumno.sexo;
        },

        eliminarAlumno(alumno) {
            if (confirm(`¿Estás seguro de eliminar al alumno ${alumno.nombre}?`)) {
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
            }
        },

        reproducirMusica() {
            const audio = this.$refs.audio;
            const botonMusica = this.$refs.botonMusica;

            if (this.reproduciendo) {
                audio.pause();
                this.reproduciendo = false;
                botonMusica.classList.remove('girando', 'reproduciendo');
            } else {
                audio.play();
                this.reproduciendo = true;
                botonMusica.classList.add('girando', 'reproduciendo');
            }
        },

        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.municipio = '';
            this.distrito = '';
            this.telefono = '';
            this.fechaNacimiento = '';
            this.sexo = '';
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');