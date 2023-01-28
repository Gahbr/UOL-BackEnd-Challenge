fetch("http://localhost:3000/jogadores").then(dados =>{
    return dados.json()})
    .then(
       dados => dados.forEach(element => {
            document.getElementById("tabela").innerHTML += `
                <tr>
                    <td>${element.nome}</td>
                    <td>${element.email}</td>
                    <td>${element.telefone}</td>
                    <td>${element.codinome}</td>
                    <td>${element.grupo}</td>
                    <td><button class="btn-secondary" onclick="handleDelete('${element._id}')">Excluir</button></td>
                </tr>
                `
        })
    );

    async function handleDelete(id) {
      try {
        await fetch(`http://localhost:3000/${id}`, { method: "DELETE" });
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
