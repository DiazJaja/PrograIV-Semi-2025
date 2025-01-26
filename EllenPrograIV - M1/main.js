const { createApp } = Vue;

createApp({
    data() {
        return {
            mostrarPantallaInicial: true, // Controla qué pantalla se muestra
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: ''
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
            audio.play();
        }
    }
}).mount('#app');