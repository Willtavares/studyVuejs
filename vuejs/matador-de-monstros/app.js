new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        iniciarJogo(){
            this.running = true
            this.monsterLife = 100
            this.playerLife = 100
            this.logs = []
        },
        atacar(especial){
            this.dano('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.monsterLife > 0) {
                this.dano('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')  
            }
        },
        dano(atr, min, max, especial, source, target, cls){
            const bruto = especial ? 5 : 0
            const dano = this.pegarRandomico(min + bruto, max + bruto)
            this[atr] = Math.max(this[atr] - dano, 0)
            this.registroLogs(`${source} atingiu ${target} com ${dano}.`, cls)
        },
        curandoComDano(){
          this.cura(10,15)
          this.dano('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        cura(min, max){
            const cura = this.pegarRandomico(min, max)
            this.playerLife = Math.min(this.playerLife + cura, 100)
            this.registroLogs(`Jogador ganhou força de ${heal}.`, 'player')
        },
        pegarRandomico(min, max){
            const valor = Math.random() * (max - min) + min
            return Math.round(valor)
        },
        registroLogs(text, cls){
            this.logs.unshift({text, cls})
        }
    },
    watch: {
        hasResult(valor){
            if (valor) this.running = false
        }
    }
})