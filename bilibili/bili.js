var navUl = document.querySelector('.nav-l ul');//导航菜单ul
var navTopUl = document.querySelector('.nav-t ul');//下拉菜单ul
var navrClick = document.querySelector('.nav-r');//右侧点击按钮
var navTop = document.querySelector('.nav-t');//下拉菜单div
var navUpArrow = document.querySelector('.nav-t .icon-up-arrow');//收回菜单按钮
var navSlide = document.querySelector('.nav-slide');//导航菜单滑块
var main = document.querySelector('.main');//主体内容

//下拉菜单渲染
var navTopFrag = document.createDocumentFragment();
res.nav.forEach(function(item){
    var li = document.createElement('li');
    li.style="width:15.75vmin;line-height:8vmin;font-size:3.733vmin;color:gray;text-align:center;"
    li.innerHTML = `${item}`
    navTopFrag.appendChild(li);
});
navTopUl.appendChild(navTopFrag);

//点击下拉菜单和收回菜单
navrClick.addEventListener('click',function(){
    navTop.style=" visibility: visible;transform: translateY(35vmin);"
    main.style="filter:brightness(0.5);";
})

navUpArrow.addEventListener('click',function(){
    navTop.style=" visibility: hidden;transform: translateY(0);"
    main.style="filter:brightness(1);";
})


// console.log(navUl);
//nav ul标签的子节点
var fragOne = document.createDocumentFragment();
res.nav.forEach(function(item){
    var li = document.createElement('li');
    li.style="width:15.75vmin;height:100%;display: inline-block;line-height:10.92vmin;font-size:3.733vmin;color:gray;text-align:center;"
    li.innerHTML = `${item}`
    fragOne.appendChild(li);
});
navUl.appendChild(fragOne);
// nav ul 滑动效果
var navStartX = 0;
var currentX = 0;
var navEndX = 0;
function getVminInPixels(vminValue) {
    return (vminValue / 100) * Math.min(window.innerWidth, window.innerHeight);
}
function touchmove(e){
    navEndX = e.touches[0].clientX-navStartX;
    var EndSumX = navEndX+currentX;
    // console.log('touchmove');
    // console.log(EndSumX);
    var maxEndSumX = -getVminInPixels(250);
    // console.log(maxEndSumX);
    if(EndSumX>0){
        EndSumX = 0;
    }else if(EndSumX<maxEndSumX){
        EndSumX = maxEndSumX;
    }
    navUl.style= `transition:all 0s ;transform: translateX(${EndSumX}px)`;
}
navUl.addEventListener('touchstart',function(e){
    // e.preventDefault();
    navStartX = e.touches[0].clientX;
    // console.log(navStartX)
    document.addEventListener('touchmove',touchmove);
    // console.log('touchstart')
})
document.addEventListener('touchend',function(){
    document.removeEventListener('touchmove',touchmove);
    // console.log('touchend')
    currentX += navEndX;
});
// nav ul 点击效果 
var navLis = document.querySelectorAll('.nav-l ul li');//导航菜单lis
// console.log(navLis[4]);
//获取第五个li的位置信息,将它与窗口距离作为基准
var liFourPos = navLis[3].getBoundingClientRect();
// console.log(liFourPos.left) 
var clickDistance = 0;
var lastLiOffsetLeft = 0;
var slideDistance = 0;
var sumSlideDistance = 0;
navLis.forEach(function(item){
    item.addEventListener('click',function(){
        // navSlide.style="background-color:#f69;"
        // console.log('点击li距离ul左侧'+item.offsetLeft)
        clickDistance = liFourPos.left-item.offsetLeft;
        // console.log('移动距离'+clickDistance);
        if(clickDistance>0){
            clickDistance = 0;
        }
        navUl.style = `transition:all 0.3s ease-in-out;transform: translateX(${clickDistance}px)`;


        navLis.forEach(function(item){
            item.style.color = "gray";
        })
        this.style.color = "#f69";

        //导航栏菜单滑块
        slideDistance = item.offsetLeft-lastLiOffsetLeft;
        console.log('滑动距离'+slideDistance);
        sumSlideDistance += slideDistance;
        var timer = setTimeout(function(){
            navSlide.style = `background-color:#f69;transition:all 0.3s ease-in-out;transform: translateX(${sumSlideDistance}px)`;
        } , 100);
        lastLiOffsetLeft = item.offsetLeft;
    })
    })

    // 页面渲染
    function three(num){
        if(num>=10000&&num<100000000){
            var numStr = (num/10000).toFixed(1).toString();
            numStr = numStr.slice(0,numStr.indexOf('.')+2)+'万';
        }else if(num>=100000000){
            var numStr = (num/100000000).toFixed(1).toString();
            numStr = numStr.slice(0,numStr.indexOf('.')+2)+'亿';
        }else{
            numStr = num.toString();
        }
        return numStr;
    }
    console.log(three(res.data[0].stat.view));

    // 主体渲染
    
    var mainFrag = document.createDocumentFragment();
    res.data.forEach(function(item){
        var div = document.createElement('div');
        var view = three(item.stat.view);
        var danmaku = three(item.stat.danmaku);
        div.innerHTML = `<div class="main-out">
                             <div class="main-img">
                                <img src="${item.pic}" />
                                  <div class="play">
                                  <div class="svg-icon">
                                        <svg  width="5vmin" height="5vmin">
                                            <use xlink:href="#icon-play"></use>
                                        </svg>
                                    </div>
                                    <span>${view}</span>
                                  </div>
                <div class="danmaku">
                <div class="svg-icon">
                    <svg width="5vmin" height="5vmin">
                    <use xlink:href="#icon-comments"></use>
                </svg></div><span>${danmaku}</span>
                </div>
                </div>
                <p style="font-size:3.733vmin">${item.title}</p></div>`;
        mainFrag.appendChild(div);
    })
    main.appendChild(mainFrag);

    //下拉刷新
    var Main = document.querySelector('.Main');
    var MainPosMsg = Main.getBoundingClientRect();
    var MainEndY =0;
    var MainStartY = 0;
    var MainPosMsgDown = 0;
    console.log(MainPosMsg.top)
    //92.9124984741211
    function Mainmove(e){
        MainEndY = e.touches[0].clientY-MainStartY;
    }

    Main.addEventListener('touchstart',function(e){
            MainPosMsgDown = Main.getBoundingClientRect();
            console.log(MainPosMsgDown.top)
            MainStartY = e.touches[0].clientY;
            Main.addEventListener('touchmove',Mainmove);
        
    })

    //bili跳动效果
    var jump = document.querySelector('.jump');
    // var jumpFlag = false;
    jump.addEventListener('click',function(){
        jump.style.animationName = "jump";
        location.reload();
    });
        jump.addEventListener('animationend',function(){
        jump.style.animationName = "";
    })


    // document.addEventListener('touchend',function(){
    //     Main.removeEventListener('touchmove',Mainmove);
    //     if(MainPosMsg.top-5<MainPosMsgDown.top){
    //         console.log(MainPosMsg.top);
    //     if(MainEndY>10){
    //         console.log('下拉刷新');
    //         var div = document.createElement('div');
    //         div.innerHTML = "刷新中...";
    //         div.style = "width:40vmin;height:20vmin;line-height:20vmin;border-radius:10vmin;text-align:center; background:rgba(148, 148, 148, 0.8);position:fixed;font-size:5vmin ;top:20%;left:50%;transform:translate(-50%,0);"
    //         // this.body.style.filter = "brightness(0.5)";
    //         document.body.appendChild(div);
    //     }}

    //     var timer = setTimeout(function(){
    //         document.body.removeChild(div);
    //     },1000);
    // })

    

    






