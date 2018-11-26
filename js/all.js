let btn = document.querySelector('#btn-result'); // 按鈕整體


let bmibtn = document.querySelector('.bmi-btn'); // 看結果的初始圓形按鈕外型
let bmiround = document.querySelector('.bmi-round'); // 顯示結果的空心圓按鈕外型

let height = document.querySelector('#person-h'); // 身高
let weight = document.querySelector('#person-w');// 體重
let list = document.querySelector('.bmi-data');  //網頁下方渲染出來數值的位置

let data = JSON.parse(localStorage.getItem('dataList')) || [];  //資料佔存

//點擊按鈕計算MBI
btn.addEventListener('click',bmiData);
//刪除資料 
list.addEventListener('click',delData);

//點擊輸入框隱藏原始按鈕
height.addEventListener('focus',showBtn); 
//點擊輸入框隱藏原始按鈕
weight.addEventListener('focus',showBtn);

updateData();  //先渲染畫面一次

//顯示原始按鈕樣式
function showBtn(e) {
	bmibtn.setAttribute('class', 'bmi-btn');
	bmiround.setAttribute('class', 'bmi-round r1 close');
	// height.value="";
	// weight.value="";
}

//刪除連結
function delData(e) {
	e.preventDefault();
	let num = e.target.dataset.num;
	if (e.target.nodeName !== 'A') {return}
	data.splice(num,1);
	localStorage.setItem('dataList', JSON.stringify(data));	
	updateData(data);
}

//計算按鈕
function bmiData(){
	let color = "";  //BMI顏色
	let rank = ""; //BMI文字
	let bmiM = (height.value) / 100;  //先把身高換算成公尺
	let bmih = height.value;
	let kg = weight.value;
	let bmi = (kg/(bmiM * bmiM)).toFixed(2);  //計算完成後的數值
	// console.log(bmih);
	//time
	let T = new Date();  //建立時間
	let D = ('0' + T.getDate()).slice(-2); // 天 (如果是個位數+0)
	let M = ('0' + (T.getMonth()+1)).slice(-2); // 月份 (如果是個位數+0)
	let Y = T.getFullYear(); // 年

	let Time  = M + '-'+ D + '-' + Y;

	bmibtn.setAttribute("class","bmi-btn close") //點擊按鈕後把原本狀態隱藏
	
	if(bmi<18.5) {
		color = 'r2';
		rank = '過輕';
		bmiround.setAttribute("class","bmi-round r2")
		// btn.setAttribute("class","bmi-tit r2");
	} 
	else if(18.5<=bmi && bmi<25) {
		color = 'r1';
		rank = '理想';
		bmiround.setAttribute("class","bmi-round r1")
		// btn.setAttribute("class","bmi-tit r1");
	} 
	else if(25<=bmi && bmi<27) {
		color = 'r3';
		rank = '過重';
		bmiround.setAttribute("class","bmi-round r3")
		// btn.setAttribute("class","bmi-tit r3");
	} 
	else if(27<=bmi && bmi<30) {
		color = 'r4';
		rank = '輕度肥胖';
		bmiround.setAttribute("class","bmi-round r4")
		// btn.setAttribute("class","bmi-tit r4");
	} 
	else if(30<=bmi && bmi<35) {
		color = 'r5';
		rank = '中度肥胖';
		bmiround.setAttribute("class","bmi-round r5")
		// btn.setAttribute("class","bmi-tit r5");
	} 
	else if(bmi>=35) {
		color = 'r6';
		rank = '重度肥胖';
		bmiround.setAttribute("class","bmi-round r6")
		// btn.setAttribute("class","bmi-tit r6");
	}
	else if(bmi == "NaN") {
		alert('輸入框不可空白哦！');
		return
	}


	let newData = {
		color: color,  
		content: rank, 
		bmi: bmi,
		weight: kg,
		height: bmih,	
		time: Time
	}

	//輸入完畢點擊按鈕之後 讓輸入框數值空白
	height.value="";
	weight.value="";

	data.push(newData);
	updateData();
	localStorage.setItem('dataList', JSON.stringify(data));

}


// 更新畫面
function updateData(){
	let str = "";

	for (let i = 0; i < data.length; i++) {
		str +=`
			<li>	
				<span class="bmi-tit ${data[i].color}">${data[i].content}</span>
				<span class="bmi-bmi"><small>BMI</small>${data[i].bmi}</span>
				<span class="bmi-w"><small>weight</small>${data[i].weight}kg</span>
				<span class="bmi-h"><small>height</small>${data[i].height}cm</span>
				<span class="bmi-t">${data[i].time}</span>
				<span><a data-num="${i}" class="del" href="javascript:;">清除</a></span>
			</li>`	
	}
	list.innerHTML = str;
}