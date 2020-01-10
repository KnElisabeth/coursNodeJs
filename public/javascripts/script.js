const form=document.getElementById('formTweet')
if (form){
    form.addEventListener('submit', function(event){
        event.preventDefault()
        //signifie que l'on ne soumet pas le formulaire
        console.log(event)
        //récupérer la valeur de la zone de texte pour le nouveau tweet
        const tweetContent=document.querySelector("textarea").value
        console.log(tweetContent)
        //vérifier la longueur du texte
        if(tweetContent.length>280){
            alert('trop de caractère')
        }else{
            fetch('/tweet',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({messageAjoute:tweetContent}
            )})
        }
    })
}


const update=document.getElementById('editTweet')
if (update){
    update.addEventListener('submit', function(event){
        event.preventDefault()
        //signifie que l'on ne soumet pas le formulaire
        console.log(event)
        //récupérer la valeur de la zone de texte pour le nouveau tweet
        const tweetContent=document.querySelector("textarea").value
        console.log(tweetContent)
        //vérifier la longueur du texte
        if(tweetContent.length>280){
            alert('trop de caractère')
        }else{
            fetch('', {
                //pas d'url donc il récupère celle où je suis déjà
                //mais attention à mettre une string vide malgré tout !!!!!
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({messageModifie:tweetContent}
            )})
            //une fois la réponse serveur obtenue, on continue avec le .then
            .then(function(response){
                if(response.status===200){
                    location.href='/'
                }
            })
        }
    })
}

const search=document.getElementById('search')
const container=document.getElementById('container')
if(search){
    search.addEventListener('input', function(event){
        const value=search.value
        fetch('/search?input='+value,{
            method:'GET'
            // pas de body en méthode get, d'où le ?
        })
        //une fois que le serveur a répondu, qu'est-ce que je fais avec la réponse du serveur
        .then(function(response){
            console.log(response)
            return response.json()
            //pour convertir la réponse en js
        })
        .then(function(responseJson){
            //c'est l'objet js une fois converti et je peux donc appeler le template récupéré dans la route search du index.js
            container.innerHTML=responseJson.jelAppelleCommeJeVeux
        })
    })
}