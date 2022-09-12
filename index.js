const operacaoAnteriorTexto = document.querySelector("#operacao-anterior");
const operacaoAtualTexto = document.querySelector("#operacao-atual");
const botoes = document.querySelectorAll("#botao-calc button");
class Calculadora {
    constructor(operacaoAnteriorTexto, operacaoAtualTexto) {
        this.operacaoAnteriorTexto = operacaoAnteriorTexto;
        this.operacaoAtualTexto = operacaoAtualTexto;
        this.operacaoAtual = "";
    }
    digitar(digito) {
        console.log(digito);
        if (digito === "." && this.operacaoAtualTexto.innerText.includes(".")) {
            return;
        }
        this.operacaoAtual = digito;
        this.atualizarTela();
    }
    contemOperacao(operacao) {
        if (this.operacaoAtualTexto.innerText === "" && operacao !== "C") {
            if (this.operacaoAnteriorTexto.innerText !== "") {
                this.trocarOperacao(operacao);
            }
            return;
        }
        let valorOperacao;
        let anterior = +this.operacaoAnteriorTexto.innerText.split(" ")[0];
        let atual = +this.operacaoAtualTexto.innerText;

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.atualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "DEL":
                this.deletarOperacao();
                break;
            case "CE":
                this.limparOperacaoAtual();
                break;
            case "C":
                this.limparOperacao();
                break;
            case "=":
                this.resultadoIgual();
                break;
            default:
                return;
        }
    }
    atualizarTela(
        valorOperacao = null,
        operacao = null,
        atual = null,
        anterior = null
    ) {
        if (valorOperacao === null) {
            this.operacaoAtualTexto.innerText += this.operacaoAtual;
        } else {
            if (anterior === 0) {
                valorOperacao = atual;
            }
            this.operacaoAnteriorTexto.innerText = `${valorOperacao} ${operacao}`;
            this.operacaoAtualTexto.innerText = "";
        }
    }
    trocarOperacao(operacao) {
        const operacaoMatematica = ["*", "-", "+", "/"];
        if (!operacaoMatematica.includes(operacao)) {
            return;
        }
        this.operacaoAnteriorTexto.innerText =
            this.operacaoAnteriorTexto.innerText.slice(0, -1) + operacao;
    }
    deletarOperacao() {
        this.operacaoAtualTexto.innerText =
            this.operacaoAtualTexto.innerText.slice(0, -1);
    }
    limparOperacaoAtual() {
        this.operacaoAtualTexto.innerText = "";
    }
    limparOperacao() {
        this.operacaoAtualTexto.innerText = "";
        this.operacaoAnteriorTexto.innerText = "";
    }
    resultadoIgual() {
        let operacao = this.operacaoAnteriorTexto.innerText.split(" ")[1];
        this.contemOperacao(operacao);
    }
}
const calc = new Calculadora(operacaoAnteriorTexto, operacaoAtualTexto);
botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;
        if (+valor >= 0 || valor === ".") {
            console.log(valor);
            calc.digitar(valor);
        } else {
            calc.contemOperacao(valor);
        }
    });
});