/*グローバル変数を宣言*/
var screenSizeX = 1000; //キャンバスの幅
var screenSizeY = screenSizeX/2+10; //キャンバスの高さ
var sideCellX = 201; //横のセル数
var sideCellY = Math.floor((sideCellX+1)/2); //縦のセル数
var cellSize = screenSizeX/sideCellX;
var canvas; //= document.getElementById('world');
var context; //= canvas.getContext('2d');
var rule = 30; //ルールを設定
var ruleCopy = new Array(8); //変換されたルールの保管場所
var field = new Array(sideCellX*sideCellY); //フィールドの情報
var ranbomSwitch = 'no';

/*初期化と開始処理*/
window.onload = function() {
	canvas = document.getElementById('world'); // canvas要素を取得
	canvas.width = screenSizeX;
	canvas.height = screenSizeY; // キャンバスのサイズを設定
	var scaleRate = Math.min(window.innerWidth/screenSizeX, (window.innerHeight-150)/screenSizeY); // Canvas引き伸ばし率の取得
	canvas.style.width = screenSizeX*scaleRate+'px';
	canvas.style.height = screenSizeY*scaleRate+'px';  // キャンバスを引き伸ばし
	context = canvas.getContext('2d'); // コンテキスト
	context.fillStyle = 'rgb(211, 85, 149)'; //生きたセルの色の設定
	document.getElementById('number').textContent = rule;
	update(field); //ゲーム開始
}

/*生きたセルと死んだセルの計算*/
var update = function(field) {
	for(var i=0;i<field.length;i++) field[i]=0; //フィールドの初期化
	var binaryChange = rule;
	for(i=0; i<ruleCopy.length; i++) {
		if(i!==0) binaryChange = Math.floor(binaryChange/2);
		ruleCopy[i] = binaryChange%2; //ルールを二進数に変換
	}
	if(ranbomSwitch==='yes') {
		for(i=0; i<sideCellX ;i++) field[i] = Math.floor(Math.random()*2); //初期配置ランダム
	}
	else field[(sideCellX-1)/2] = 1;//初期配置中央固定
	for(i=1;i<sideCellY; i++){
		for(var j=0;j<sideCellX;j++){
			var here=i*sideCellX+j; //現在地（計算したいセルの番号）
			var LCR=[0,0,0]; //近傍の状態
			for(var k=-1;k<=1; k++) {  //近傍を見る
				var check=here-sideCellX+k; //チェックするセル
				if(k==1 && check%sideCellX===0){
					if(field[check-sideCellX]===1) {
						LCR[k+1]=1;
					}
				}	
				else if(k==-1 && (check%sideCellX===sideCellX-1 || check===-1)){
					if(field[check+sideCellX]===1) {
						LCR[k+1]=1;
					}
				}	//端処理(左右ループ)
				else if(field[check]===1) {
					LCR[k+1]=1;
				}
			}
			var n=LCR[0]*4+LCR[1]*2+LCR[2]; //近傍の状態を0~7の整数に
			field[here] = ruleCopy[n]; //ルールを適用
		}
		draw(field);
	}
}

/*キャンバスの描画、update関数の中で呼び出される*/
function draw(field) {
	context.clearRect(0, 0, screenSizeX, screenSizeY); // 画面をクリア
	for (var i=0; i<field.length; i++) {
		var x = (i%sideCellX) * cellSize;           // x座標
		var y = Math.floor(i/sideCellX) * cellSize; // y座標
		if (field[i]) context.fillRect(x, y, cellSize, cellSize); // 「生」を描画(context.fillRectは基準点のx座標,y座標,塗りの横幅,縦幅を与えられるとその範囲を塗り潰す)
	}
}

document.getElementById('randomRule').onclick = function() { //ボタンが押された時
	rule = Math.floor(Math.random()*255) +1; // ルールを1~255に変更
	document.getElementById('number').textContent = rule;
	update(field);
}

document.getElementById('randomSwitch').onclick = function() {
	if(ranbomSwitch==='yes') {
		ranbomSwitch = 'no';
		document.getElementById('randomSwitch').textContent = "初期配置をランダムにする";
	}
	else {
		ranbomSwitch = 'yes';
		document.getElementById('randomSwitch').textContent = '初期配置を中央一点にする';
	}
	update(field);
}

document.getElementById('rule90').onclick = function() { 
	rule = 90;
	document.getElementById('number').textContent = rule;
	update(field);
}

document.getElementById('rule126').onclick = function() { 
	rule = 126;
	document.getElementById('number').textContent = rule;
	update(field);
}

document.getElementById('rule30').onclick = function() { 
	rule = 30;
	document.getElementById('number').textContent = rule;
	update(field);
}

document.getElementById('rule110').onclick = function() { 
	rule = 110;
	document.getElementById('number').textContent = rule;
	update(field);
}

document.getElementById('rule184').onclick = function() { 
	rule = 184;
	document.getElementById('number').textContent = rule;
	update(field);
}

var ruleCheck = function() {
	var num = document.getElementById('form').ruleText.value;
	if(isFinite(num)) {
		num = Math.floor(num);
		if(num<0) {
			num = 0;
		}
		if(num>255) {
			num =255;
		}
		rule = num;
		document.getElementById('number').textContent = rule;
		update(field);
	}
	else {
		window.alert('数値ではありません');
	}
	return false;
}