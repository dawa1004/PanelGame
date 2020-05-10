(function() { //即時関数
  'use strict';

  var stage = document.getElementById('stage');
  var ctx;
  var count = 0; // 正解の数
  // var dim = 5; // ディメンション 分割数
  var dim; //分割数
  var size; //正方形サイズ
  var answer = []; // 正解
  var isPlaying = true;

  function init() {
    dim = Math.floor(count / 3) + 2; // 正解数が増えると分割数も増える
    size = Math.floor(stage.width / dim); //正方形サイズ算出
    answer = [ // 正解をランダムにする
      Math.floor(Math.random() * dim),
      Math.floor(Math.random() * dim)
    ]
  }

  function draw() {
    var x;
    var y;
    var offset = 2; //余白の幅
    var baseColor // 不正解のパネルの色
    var answerColor; // 正解のパネルの色
    var hue; // 色相
    var lightness; //明るく

    hue = Math.random() *360; // 色相ランダム
    baseColor = 'hsl(' + hue + ', 80%, 50%)';
    lightness = Math.max(75 - count, 53);
    answerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

    ctx.clearRect(0, 0, stage.width, stage.height); //パネル描画する時に一旦描画領域クリア
    for (x = 0; x < dim; x++) { // 二重ループでｎ＊ｎ
      for (y = 0; y < dim; y++) {
        if (answer[0] === x && answer[1] === y) { // 正解
          ctx.fillStyle = answerColor; // 正解の色
        } else { // 正解ではない場合
          ctx.fillStyle = baseColor; // 正解以外の色
        }
        ctx.fillRect(
          // 0, 50, 100, ...
          size * x + offset,
          size * y + offset,
          size - offset * 2, // 幅
          size - offset * 2 // 高さ
        );
        // テキスト 正方形一つずつに数字割当
        // ctx.fillStyle = '#000';
        // ctx.textBaseline = 'top';
        // ctx.fillText(x + ', ' + y, size * x, size * y);
      }
    }
  }

  //コンテクストが取得できない時処理を止める
  if (typeof stage.getContext === 'undefined') {
    return;
  }
  //コンテクストが取得できた場合
  ctx = stage.getContext('2d');
  // console.log(answer);

  stage.addEventListener('click', function(e) { //クリックしたら次の処理 e=イベントオブジェクト
    var rect;
    var x; //クリックした位置
    var y; //クリックした位置
    var replay = document.getElementById('replay'); // replayタグ読み込み
    if (isPlaying === false) { // 非プレイ状態では処理を止める
      return;
    }
    // 座標の出力
    // console.log(e.pageX);
    // console.log(e.pageY);
    rect = e.target.getBoundingClientRect(); // この領域の座標が取れる
    // console.log(e.pageX - rect.left - window.scrollX);
    // console.log(e.pageY - rect.top - window.scrollY);
    x = e.pageX - rect.left - window.scrollX;
    y = e.pageY - rect.top - window.scrollY;
    // console.log(Math.floor(x / size));
    // console.log(Math.floor(y / size));
    if (
      answer[0] === Math.floor(x / size) && //何番目のパネルかanswer[0]と照らし合わせて同じなら正解
      answer[1] === Math.floor(y / size)    //何番目のパネルかanswer[1]と照らし合わせて同じなら正解
    ) {
      // console.log('Hit!');
      count++;
      init(); // dim answerの再計算（初期化）
      draw();
    } else { // 不正解だったとき
      alert('Your score: ' + count); // スコア表示
      isPlaying = false; // プレイしていない
      replay.className = ''; //hiddenクラスを外しリプレイボタンを表示させる
    }
  });
  init();
  draw();
})();