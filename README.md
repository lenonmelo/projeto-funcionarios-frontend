
# Projeto Funcionários
### Visão Geral
Este projeto visa simplificar e otimizar a gestão de funcionários/usuários de forma eficaz.

# Desenvolvimento
Para o desenvolvimento da aplicação foram utilizadas as seguintes tecnologias web.

* Node.js versão 20.10.0
* NPM versão 10.2.3
* Vue.js versão 3.3.4
* Axios versão 1.4.0
* Bootstrap versão 5.3.2
* Vite versão 4.4.6

# Referências da API
A API desse projeto se encontra neste link: https://github.com/lenonmelo/projeto-funcionarios-backend

# Rodar a aplicação
Para executar a aplicação, é necessário que o ambiente/máquina tenha as seguintes aplicações instaladas e configuradas:
* Node.js versão citada acima instalada e configurada corretamente.
* NPM versão citada acima instalada e configurada corretamente.
  OBS: O gestor de pacotes NPM provavemente já ira ser instalado ao instalar o Node.js 
* A aplicação de banckend do projeto já clonada, configurado e executando.
  
Após concluir as instalações necessárias, siga estas etapas:
* Clonar o projeto na pasta que pretende executar o sistema;
* Acesse a pasta principal do sistema através do terminal.
* Execute o seguinte comando para instalar os pacotes necessários;

      npm install

* Acesse o arquivo "bootstrap.js" contido na pasta "/src/" e inclua o endereço principal que esta executando o backend conforme mostrado abaixo.

      window.axios.defaults.baseURL = "http://enreço do enpoint";
    
* Acesse a pasta principal do sistema através do terminal e execute o seguinte comando para iniciar a aplicação frontend.
  
        npm run dev

* Aplicação irá rodar no seguinte endereço, coforme irá ser mostrado no terminal.

        http://localhost:5173/

* Por fim acessar o endereço acima no navegador.

# Acesso

* O usuário e senha padrão de teste são as seguintes:

      Usuário: admin@teste.com.br
      Senha: admin
