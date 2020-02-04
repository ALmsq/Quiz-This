// let mainBody = document.querySelector('body')
// let mainDiv = document.createElement('div')
// mainBody.append(mainDiv)
// let testH1 = document.createElement('h1')
// testH1.innerText = 'yo'
// let testButton = document.createElement('button')
// testButton.innerText = 'test'
// mainDiv.append(testH1, testButton)
let showIntro = true
let gameContainer = document.querySelector('.game-container')
let categoriesContainer = document.querySelector('.categories-container')
let scoreContainer = document.querySelector('.score-container')
let scoreH1 = document.querySelector('.score-h1')
let categoryId = 0
let score = 0
    scoreH1.innerText = `Score: ${score}`
let body = document.querySelector("body")


// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }
// arr = [1, 2, 3, 4, 5]
// console.log(shuffle(arr))


fetch(`http://localhost:3000/categories`)
  .then(r => r.json())
  .then((categoriesArr) => {
    //   randQ = shuffle(questionArr)
    //   console.log(randQ)
    // debugger
    // debugger
    categoriesArr.forEach(category => {
        
        let rand = Math.floor(Math.random() * 60) + 1
        // console.log(category)
        // renderCategories(category)
        // console.log(category.questions)
        // randArray = category.questions[rand]
        //     console.log(randArray)
        // randArray.forEach(question => {
        //      console.log(question.question)
        // })
        // debugger
            randQuestion = category.questions[rand]

            renderCategories(randQuestion, category.questions, category)
            // console.log(category.questions)


    });
    // Create a button for each categorie
    // click on one, show questions using below logic

      // let questionArr = ??
      // let rand = Math.floor(Math.random() * questionArr.length) + 1 
      // addQuestionToGame(questionArr[rand], questionArr)
        // console.log(categoriesArr)
  })

  
  function renderCategories(randQuestion, questionArr, category){
    // console.log(category.name)
    // let rand = Math.floor(Math.random() * 60) + 1
    let categoryDiv = document.createElement('div')
        categoryDiv.className = 'card'
    let categoryH2 = document.createElement('h2')
        categoryH2.innerText = category.name
    let categoryButton = document.createElement('button')
        categoryButton.innerText = 'play'
        categoryDiv.append(categoryH2, categoryButton)
        categoriesContainer.append(categoryDiv)

        categoryButton.addEventListener('click', (event) => {
            addQuestionToGame(randQuestion, questionArr)
            categoriesContainer.style.display = 'none'
        })
  }
  

//   function addScore(){
//         let scoreH1 = document.createElement('h1')
//             scoreH1.innerText = 'Score: '
//             scoreContainer.append(scoreH1)
//   }





























  // function renderQuestionAndAnswer(question){
  //   let questionDiv = document.createElement('div')
  //     questionDiv.className = 'question-div'
  //   // gameContainer.innerHTML = ""
  //     let questionBoxH2 = document.createElement('h2')
  //         questionBoxH2.innerText = question.question

  //       questionDiv.append(questionBoxH2)
  //       gameContainer.append(questionDiv)
  //       console.log(question.r_ans)
  //       // renderQuestion(question)
  //       rightAnswer = question.r_ans
        
  //       question.answers.forEach(answer => {
  //           // debugger
  //          let answerBoxUl = document.createElement('ul')
  //          let answerBoxLi = document.createElement('li')
  //             answerBoxLi.className = 'answer'
  //               answerBoxLi.innerText = answer
  //           answerBoxUl.append(answerBoxLi)
  //           questionDiv.append(answerBoxUl)

  //       })
  // }

  
  // function fetchAndRenderQuestions(question){
  //   fetch(`http://localhost:3000/questions`)
  // .then(r => r.json())
  // .then((questionObj) => {
  //   //   randQ = shuffle(questionObj)
  //   //   console.log(randQ)

  //     // addQuestionToGame(questionObj[rand])
  //     renderQnA(questionObj[rand])
  //     // answerEventListener(questionObj[rand]) 
  //   })

  //   function renderQnA(question){
  //     let questionDiv = document.createElement('div')
  //       questionDiv.className = 'question-div'
  //     // gameContainer.innerHTML = ""
  //       let questionBoxH2 = document.createElement('h2')
  //           questionBoxH2.innerText = question.question
  
  //         questionDiv.append(questionBoxH2)
  //         gameContainer.append(questionDiv)
  //         console.log(question.r_ans)
  //         // renderQuestion(question)
  //         rightAnswer = question.r_ans
          
  //         question.answers.forEach(answer => {
  //             // debugger
  //             let answerBoxUl = document.createElement('ul')
  //             let answerBoxLi = document.createElement('li')
  //               answerBoxLi.className = 'answer'
  //                 answerBoxLi.innerText = answer
  //             answerBoxUl.append(answerBoxLi)
  //             questionDiv.append(answerBoxUl)
  //         })
  //   }
  // }
































  function addQuestionToGame(question, questionArr){
    // debugger
    
    let rand = Math.floor(Math.random() * questionArr.length) + 1 

    // body.innerHTML = " "

    let questionDiv = document.createElement('div')
    // gameContainer.innerHTML = ""
      let questionBoxH2 = document.createElement('h2')
          questionBoxH2.innerText = question.question

        questionDiv.append(questionBoxH2)
        gameContainer.append(questionDiv)
        console.log(question.r_ans)
        // renderQuestion(question)
        rightAnswer = question.r_ans
        
        question.answers.forEach(answer => {
            // debugger
            let answerBoxUl = document.createElement('ul')
            let answerBoxLi = document.createElement('li')
                answerBoxLi.innerText = answer
            answerBoxUl.append(answerBoxLi)
            questionDiv.append(answerBoxUl)

            
            
            answerBoxLi.addEventListener('click', (event) => {
                // console.log(answer === rightAnswer)
                // debugger
                if (answer === rightAnswer){
                  questionDiv.innerHTML = ''
                  addQuestionToGame(questionArr[rand], questionArr)
                  score += 5
                    scoreH1.innerText = `Score: ${score}`
                  console.log(score)
                  console.log('right')
                    
                }else{
                    event.target.style.color = 'red'
                    console.log('wrong')

                }
            })
        });
  }
