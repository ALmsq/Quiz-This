let gameContainer = document.querySelector('.game-container')
let categoriesContainer = document.querySelector('.categories-container')
let scoreContainer = document.querySelector('.score-container')
let scoreH1 = document.querySelector('.score-h1')
let livesH2 = document.querySelector('.lives-h2')
let roundH2 = document.querySelector('.round-h2')
let roundsH2 = document.querySelector('.rounds-h2')
let submitForm = document.querySelector('.trivia-space')
submitForm.style.display = 'none'
let playButton = document.querySelector('.play-button')
playButton.style.display='none'
let scoreDiv = document.querySelector('.score-div')
scoreDiv.style.display = 'none'
let triviaH1 = document.querySelector('.trivia-h1')
  triviaText = triviaH1.innerText




let score = 0
let lives = 5
let counter = 8
let count = 0
let body = document.querySelector("body")


    scoreH1.innerText = `Score: ${score}`
    livesH2.innerText = `Lives: ${lives}`
    roundH2.innerText = `Answers: ${count}/8`
    roundsH2.innerText = `Rounds: ${counter}/8`
    
    start()
    function start(){
      fetch(`https://intense-ridge-48974.herokuapp.com/categories`)
  .then(r => r.json())
  .then((categoriesArr) => {
    
    categoriesArr.forEach(category => {
        
        
        let rand = Math.floor(Math.random() * 60)
        
            randQuestion = category.questions[rand]

            renderCategories(randQuestion, category.questions, category)
            
        });   
      })
    }
    play()
    function play(){ 
      playButton.addEventListener('click', (event) => {
      event.preventDefault()
      console.log('yo')
      location.reload(true)
  })
}

  
  function renderCategories(randQuestion, questionArr, category){
     
    let categoryDiv = document.createElement('div')
        categoryDiv.className = 'card'
    let categoryH2 = document.createElement('h2')
        categoryH2.innerText = category.name


    let categoryButton = document.createElement('button')
        categoryButton.innerText = 'play'
        categoryButton.style.backgroundColor = '#A63446'
        categoryDiv.append(categoryH2,  categoryButton)
        categoriesContainer.append(categoryDiv)

    
        categoryButton.addEventListener('click', (event) => {
            addQuestionToGame(randQuestion, questionArr, category)
            categoriesContainer.style.display = 'none'
            window.scrollTo(0,0)
        })
  }
  

  function addQuestionToGame(question, questionArr, category){
      categoryId = category
    
    let rand = Math.floor(Math.random() * questionArr.length) 
    
    let questionDiv = document.createElement('div');
      // questionDiv.style.paddingBottom = '560px';
        // questionDiv.style.backgroundImage = 'linear-gradient(#515DA2, #6F9CEB )'
        // box-shadow: 10px 12px 12px 0px black;"
          questionDiv.style.backgroundColor = 'rgb(229, 218, 218, .8)'
          questionDiv.style.boxShadow = '10px 12px 12px 0px black'
          // questionDiv.style.border = 'black solid 1px'
          questionDiv.style.paddingBottom = '.2px'

      let questionBoxH2 = document.createElement('h2')
          questionBoxH2.innerText = question.question
          questionBoxH2.style.margin = 'auto'


        questionDiv.append(questionBoxH2)
        gameContainer.append(questionDiv)
        console.log(question.r_ans)
        
        rightAnswer = question.r_ans
        
        question.answers.forEach(answer => {
            
            let answerBoxUl = document.createElement('ul')
            let answerBoxLi = document.createElement('li')
                answerBoxLi.className = 'answers-li'
                answerBoxLi.innerText = answer
            answerBoxUl.append(answerBoxLi)
            questionDiv.append(answerBoxUl)
            
            
            
            answerBoxLi.addEventListener('click', (event) => {
                
                -- counter
                
                if (answer === rightAnswer){
                  questionDiv.innerHTML = ''
                  addQuestionToGame(questionArr[rand], questionArr, category)
                  score += 100
                  count ++
                    scoreH1.innerText = `Score: ${score}`
                    roundH2.innerText = `Answers: ${count}/8`
                    roundsH2.innerText = `Rounds: ${counter}/8`
                    if(counter <= 0){
                        gameContainer.innerHTML = ''
                        submitForm.style.display = 'block'
                        playButton.style.display='block'
                    }
                
                  console.log('right')
                    
                }else{
                    
                    --lives
                    

                    livesH2.innerText = `Lives: ${lives}`
                    roundsH2.innerText = `Rounds: ${counter}/8`
                    event.target.style.color = 'red'
                    if(counter <= 0 || lives < 0){
                        gameContainer.innerHTML = ''
                        submitForm.style.display = 'block'
                        playButton.style.display='block'
                    }
                    console.log('wrong')
                    
                }
            })
        });
  }

    submitForm.addEventListener('submit', (event) => {
        
        event.preventDefault()
        fetch(`https://intense-ridge-48974.herokuapp.com/scores`, {
          method:'POST',
          headers: { 
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
          name: event.target.name.value,
          score: score,
          category_id: categoryId.id
           
          })
        })
          .then(r => r.json())
          .then((form) => {
            getScorePage()
              scoreDiv.style.display = 'block'
              submitForm.style.display = 'none'
          })
          
    })

  

// getScorePage()
function getScorePage(){
    fetch(`https://intense-ridge-48974.herokuapp.com/scores`)
      .then(r => r.json())
      .then((scoresArr) => {

          scoresArr.forEach((score) => {
            console.log(score.id)
            renderScorePage(score)
          });
      })
}

function renderScorePage(score){
    
    let scoreLi = document.createElement('li')
        scoreLi.innerText = score.score
        scoreLi.className = 'score-li'
    let scoreNameLi = document.createElement('li')
        scoreNameLi.innerText = score.name
        scoreNameLi.className = 'score-li'
    let scoreNameBtn = document.createElement('button')
        scoreNameBtn.className = 'name-btn'
        scoreNameBtn.innerText = 'name button'

        


        let scoreBr = document.createElement('br')
        let scoreButton = document.createElement('button')
        scoreButton.innerText = 'delete'

        scoreDiv.append(scoreNameLi, scoreButton, scoreBr, scoreLi, scoreBr)

        scoreButton.addEventListener('click', (event) => {
            // console.log(score.id)
            fetch(`https://intense-ridge-48974.herokuapp.com/scores/${score.id}`, {
              method:'DELETE',
              
            })
              .then(r => r.json())
              .then((score) => {
                    scoreNameLi.remove()
                    scoreLi.remove()
                    scoreButton.remove()
              })
        })

        scoreNameLi.addEventListener('click', (event) => {
            console.log(score)
            fetch(`https://intense-ridge-48974.herokuapp.com/${score.id}`, {
              method:'PATCH',
              headers: { 
                'content-type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify({
              name: score.name
              })
            })
              .then(r => r.json())
              .then((nice) => {
                console.log(score.id)
                // console.log(nice)
                // debugger
                score.name = 'test'
                
              })
        })
}



    
