const { createApp } = Vue;

createApp({
    data() {
        return {
            mostrarPantallaInicial: true, // Controla qué pantalla se muestra
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            reproduciendo: false, // Estado de la música
        };
    },
    methods: {
        guardarAlumno() {
            console.log(
                this.codigo,
                this.nombre,
                this.direccion,
                this.telefono,
                this.email
            );
        },
        reproducirMusica() {
            const audio = this.$refs.audio;
            const botonMusica = this.$refs.botonMusica;

            if (this.reproduciendo) {
                // Detener la música y revertir el estilo
                audio.pause();
                this.reproduciendo = false;
                botonMusica.classList.remove('girando', 'reproduciendo');
            } else {
                // Reproducir la música y aplicar estilo
                audio.play();
                this.reproduciendo = true;
                botonMusica.classList.add('girando', 'reproduciendo');
            }
        }
    }
}).mount('#app');