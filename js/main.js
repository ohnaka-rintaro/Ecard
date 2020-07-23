'use strict';

// document.addEventListener('click', audioPlay);
// function audioPlay() {
//   document.getElementById('audio').play();
//   document.removeEventListener('click', audioPlay);
// }

{
  class Card { // eカードの設計図、4つのカードは市民で固定、１つのカードだけ皇帝と奴隷のランダムで生成
    constructor(image) {
      const section = document.createElement('section');
      section.classList.add('card');

      // this.img = document.createElement('img');
      // this.img.src = 'img/simin.jpg';

      this.img = document.createElement('img');
      this.img.src = image;

      let cardCounter = 0;
      
      this.push = document.createElement('div');
      this.push.classList.add('push');
      this.push.textContent = '出す';
      this.push.addEventListener('click', () => { // push,出すボタンを押した際の動作
        if (this.push.classList.contains('inactive')) {
          return;
        }

        if (result.classList.contains('show')) {
          return;
        }

        // if (cardCounter > 1) {
        //   // オブジェクトの値を空にしたい、オブジェクト（インスタンス）を削除したい
        //   const field = new FieldCard(image);
        // } else {
        //   const field = new FieldCard(image);
        //   cardCounter++;
        // }
        // const fieldcard = new FieldCard(image); // １枚目は普通に表示できた、ただ別のカードのpushボタンを押すと、１枚目のカードが残ったままになってしまう
        const field = new FieldCard(image);
        
        this.push.classList.add('inactive');
        this.img.classList.add('inactive');
        
        // const enemy = new EnemyCard(getRandomImage()); // 動かない！！！！　関数が実行されていない感じがする。それかreturnの引数が間違っているのか。
        const enemy = new EnemyCard();
        
        if ((field.img.src === siminSrc) && (enemy.img.src === doreiSrc)) { // 自分が市民、相手が奴隷
          resultImage.src = 'img/kaiji_win.jpeg';
          resultText.textContent = 'あなたの勝ちです！';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
        } else if ((field.img.src === siminSrc) && (enemy.img.src === kouteiSrc)) { // 自分が市民、相手が皇帝
          resultImage.src = 'img/kaiji_lose.jpg';
          resultText.textContent = 'あなたの負けです！';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
        } else if ((field.img.src === kouteiSrc) && (enemy.img.src === siminSrc)) { // 自分が皇帝、相手が市民
          resultImage.src = 'img/kaiji_win.jpeg';
          resultText.textContent = 'あなたの勝ちです！';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
        } else if ((field.img.src === kouteiSrc) && (enemy.img.src === doreiSrc)) { // 自分が皇帝、相手が奴隷
          resultImage.src = 'img/kaiji_hebime';
          resultText.textContent = 'へびめ...！！！（利根川）';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
        } else if ((field.img.src === doreiSrc) && (enemy.img.src === siminSrc)) { // 自分が奴隷、相手が市民
          resultImage.src = 'img/kaiji_lose.jpg';
          resultText.textContent = 'あなたの負けです！';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
        } else if ((field.img.src === doreiSrc) && (enemy.img.src === kouteiSrc)) { // 自分が奴隷、相手が皇帝
          bgmPlay();
          resultImage.src = 'img/kaiji.jpg';
          resultText.textContent = 'このみっともねえ奴隷がああああ！！！（カイジ）';
          linkText.textContent = 'もう一度やる';
          result.classList.add('show');
          tonegawa.classList.add('show');
          tonegawaImage.src = 'img/tonegawa2.JPG'; 
        } else if (field.img.src === enemy.img.src) { // 同じカードだった場合
          // bgmPlay();
          resultImage.src = 'img/kaiji_hikiwake.jpg';
          // resultText.textContent = '引き分けです！';
          resultText.textContent = ['引き分けです！'];
          result.classList.add('show');
          linkText.textContent = '続ける';
        };

      });

      section.appendChild(this.img);
      section.appendChild(this.push);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    // getRandomImage() {
    //   const images = [
    //     'img/simin.jpg',
    //     'img/dorei.png',
    //     'img/koutei.jpg',
    //   ];
    //   return images[Math.floor(Math.random() * images.length)]; // ランダムな整数値を生成（この場合は0〜2まで）
    // }
  }

  function bgmPlay() {
    document.getElementById('audio').play();
  }

  const siminSrc = 'file:///Users/ohnakarintaro/Desktop/MyEcard/img/simin.jpg';
  const doreiSrc = 'file:///Users/ohnakarintaro/Desktop/MyEcard/img/dorei.png';
  const kouteiSrc = 'file:///Users/ohnakarintaro/Desktop/MyEcard/img/koutei.jpg';
  const nullSrc = 'file:///Users/ohnakarintaro/Desktop/MyEcard/img/null.png';
  

  class FieldCard {
    constructor(image) {
      const section = document.createElement('section');
      section.classList.add('fieldcard');

      this.img = document.createElement('img');
      this.img.src = image;

      section.appendChild(this.img);

      const field = document.querySelector('.field');
      field.appendChild(section);
    }
  }

  class EnemyCard {
    // constructor(images) {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('enemycard');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage(); // getRandomImage()のreturnであるimagesを代入して表示

      section.appendChild(this.img);

      const enemy = document.querySelector('.enemy');
      enemy.appendChild(section);
    }

    // getRandomImage() { // 市民は４回、皇帝は１回、奴隷は今回は０回の表示に設定する
    //   const images = [
    //     'img/simin.jpg',
    //     'img/dorei.png',
    //     'img/koutei.jpg',
    //   ];
    //   return images[Math.floor(Math.random() * images.length)]; // ランダムな整数値を生成（この場合は0〜2まで）
    // }

    // getRandomImage() {
    //   const enemycards = [
    //     'img/simin.jpg',
    //     'img/dorei.png',
    //     'img/koutei.jpg',
    //   ];
      
    //   let length = enemycards.length;
    //   for(let i = length -1; i > 0; i--) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     let tmp = enemycards[i];
    //     enemycards[i] = enemycards[j];
    //     enemycards[j] = tmp;
    //   }

    //   return enemycards.shift();
    // }

    getRandomImage() {
      return enemycards.shift();
    }
  }

  const enemycards = [
    'img/simin.jpg',
    'img/simin.jpg',
    'img/simin.jpg',
    'img/koutei.jpg',
    'img/simin.jpg',
  ];

  let length = enemycards.length;
  for(let i = length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = enemycards[i];
    enemycards[i] = enemycards[j];
    enemycards[j] = tmp;
  }

  const cards = [ // eカードを生成する（クラスからインスタンスを生成）
    new Card('img/simin.jpg'),
    new Card('img/simin.jpg'),
    new Card('img/dorei.png'),
    new Card('img/simin.jpg'),
    new Card('img/simin.jpg'),
  ];

  // class Result {
  //   constructor() {
  //     const section = document.createElement('section');
  //     section.classList.add('resultpanel');

  //     const result = document.getElementById('result');
  //     result.appendChild(section);
  //   }
  // }

  // class Result {
  //   constructor() {
  //     const section = document.createElement('section');
  //     section.classList.add('resultpanel');

  //     this.img = document.createElement('img');
  //     this.img.src = 'img/kaiji.jpg';

  //     const result = document.getElementById('result');
  //     result.appendChild(section);
  //   }
  // }

  // const section = document.createElement('section');
  // section.classList.add('resultpanel');

  // this.img = document.createElement('img');
  // this.img.src = 'img/kaiji.jpg';

  // section.appendChild(this.img);

  // const result = document.getElementById('result');
  // result.appendChild(section);

  // class Result {
  //   constructor(photo) {
  //     const section = document.createElement('section');
  //     section.classList.add('resultpanel');

  //     this.img = document.createElement('img');
  //     this.img.src = photo;

  //     const result = document.getElementById('result');
  //     result.appendChild(section);
  //   }
  // }

  const section = document.createElement('section');
  section.classList.add('resultpanel'); // これがよくわかってない

  // this.img = document.createElement('img');
  // this.img.src = photo;

  const result = document.getElementById('result');
  result.appendChild(section);

  const resultText = document.querySelector('#result > p'); // クラスの中に入れると機能しなくなる、グローバル変数ではなくなる？
  const resultImage = document.getElementById('resultImage');
  // const linkText = document.querySelector('#result > a');
  const linkText = document.getElementById('reset');

  linkText.addEventListener('click', () => {
    if (resultText.textContent.includes('引き分けです！') === true) {
      result.classList.remove('show'); // これだとclassListは外れるかもしれないけど、aタグをクリックすることには変わりがない
      
    } else {
      window.location.reload();
    }
  })

  const tonegawa = document.getElementById('tonegawa');
  tonegawa.appendChild(section);
  const tonegawaImage = document.getElementById('tonegawaImage');
  // const fieldcards = new FieldCard('img/koutei.jpg');
}

// 次の処理は、カードを出した後に出すボタンの色をopacityで薄くするのと、再度文字をボタンを打てなくすること。機能を無効化すること。