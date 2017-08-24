//如果没有细致的模块化，说实话还是觉得css比对应的在js中写css好用
//细致的模块话，似乎是用less来定制，而不是用css
//注意新建的Vue对象，对应的标签中，最外层涵盖最离层，如果，例外都申明new一个，会导致报错，找不到里面的申明
//对于样式问题，于今天开始，尽量以类的形式声明，而不用style，来直接写样式二出现在标签内部了
//暂定
//如果层级过多则维护不便，则决定，最外层的样式不使用vue的模块化，而是直接引用css的样式类
//
var header = new Vue({
	el:'#header',
	data:{
		header_style:'header_style',
		//left
		message:"欢迎光临顺财玉石!",
		lf:'lf',
		headerLf:[
		{text:"登陆"},
		{text:"免费注册"},
		{text:"我的账号"}
		],
		//right
		headerRt:[
		{text:"购物车（0）"},
		{text:"我的订单"},
		{text:"关于我们"},
		{text:"联系客服"},
		],
		rt: 'rt',
	}
})

var nav = new Vue({
	el:'#nav',
	data:{
		//最外层nav的样式
		nav_height:'nav_height',
		//nav中ul的设置
		nav_ul_style:'nav_ul_style',
		//logo处，应该是插入图片，暂时用文字代替
		message: 'Logo',
		//ul里面li的样式
		nav_ul_li:'nav_ul_li',
		//nav里面的子标题,详细信息
		nav_title:[
		{text:"项链"},
		{text:"手镯"},
		{text:"手链"},
		{text:"玉佩"},
		{text:"原石"},
		{text:"佛像"},
		{text:"精美摆件"},
		{text:"玉石屏风"},
		{text:"其他商品"}
		],
		lf:'lf',
		rt:'rt',
	}
})
var nav_left = new Vue({
	el:'#nav_left',
	data:{
		necklace:'项链',
		necklaces:[
		{text:"项链1"},
		{text:"项链2"},
		],
		bracelet:'手镯',
		bracelets:[
		{text:"手镯1"},
		{text:"手镯2"},
		],
		chain:'手链',
		chains:[
		{text:"手链1"},
		{text:"手链2"},
		],
		jade:'玉佩',
		jades:[
		{text:'玉佩1'},
		{text:'玉佩2'},
		],
		roughJade:'原石',
		roughJades:[
		{text:'原石1'},
		{text:'原石2'},
		],
		buddha:'佛像',
		buddhas:[
		{text:'佛像1'},
		{text:'佛像2'},
		],
		exquisiteGood:'精致摆件',
		exquisiteGoods:[
		{text:'精致摆件1'},
		{text:'精致摆件2'},
		],
		foldingScreen:'玉石屏风',
		foldingScreenes:[
		{text:'玉石屏风1'},
		{text:'玉石屏风2'},
		],
		otherAccessory:'其他饰品',
		otherAccessories:[
		{text:'其他饰品1'},
		{text:'其他饰品2'},
		],
		div_sides_bg:'div_sides_bg',	
		//overflow_hidden:'overflow_hidden',
		nav_left_position:'nav_left_position',
		lf:'lf',
		rt:'rt',

	}
})


var nav_mid_swiper_width = $('#nav_mid').width();
var nav_mid_swiper_height = $('#nav_mid').height();
var nav_mid = new Vue({
	el:'#nav_mid',
    data:{
      originalData:{
      img_width:nav_mid_swiper_width,
      img_height:nav_mid_swiper_height,
      btn_width:40,
      btn_height:40,
      num:4,
      delay:300
            },
      isTrans:true,// 因为到最后一张图片，index为1时，需要立即跳到第二张index也为1的图片，这个用来是否给出transition
      index:1,
      timer:null,// setInterval
      clickdelay:false,// 用来防止连续点击
	  lf:'lf',
           },
    methods:{
        prev () {
                    if(this.clickdelay){
                        return 
                    }
                    this.clickdelay=true
                    if(this.index==1){
                        this.index=this.originalData.num
                    }else{
                        this.index-=1
                    }
                    this.animate(-this.originalData.img_width)  
                },
                next(){
                    if(this.clickdelay){
                        return 
                    }
                    this.clickdelay=true
                    if(this.index==this.originalData.num){
                        this.index=1
                    }else{

                        this.index+=1
                    }
                    this.animate(this.originalData.img_width)

                },
                animate(offset){
                    var node=this.$refs.wrapperContent
                    var self=this;
                    var left=parseInt(node.style.left)-offset
                    this.isTrans=true
                    node.style.left=left+'px'
                    setTimeout(function(){
                        if(left<-(self.originalData.num*self.originalData.img_width)){
                            self.isTrans=false
                            node.style.left=-self.originalData.img_width+'px'
                            self.clickdelay=false //当到达最后一张图片时 
                        }
                        if(left>-100){
                            self.isTrans=false
                            node.style.left=-self.originalData.num*self.originalData.img_width+'px'
                            self.clickdelay=false //当到达第一张图片时  
                        }
                    },this.originalData.delay)
                },
                play(){

                    var self=this;
                    this.timer=setInterval(function(){
                        self.next()
                    },2000)
                },
                stop(){
                    this.clickdelay=false//用来防止连续点击
                    clearInterval(this.timer)
                    this.timer=null
                },
                turnTo(flag){
                    if(flag==this.index){
                        return
                    }else{
                        var offset=(flag-this.index)*this.originalData.img_width
                        this.index=flag
                        this.animate(offset)
                    }

                }
            },
    mounted(){
                /*下面是判断过渡动画是否完成*/ 
                var node=this.$refs.wrapperContent
                var transitions = {
                     'transition':'transitionend',
                     'OTransition':'oTransitionEnd',
                     'MozTransition':'transitionend',
                     'WebkitTransition':'webkitTransitionEnd'
                    }
                    var self=this

               for(var t in transitions){

                   if( node.style[t] !== undefined ){
                       var transitionEvent=transitions[t];
                   }
               }
               transitionEvent && node.addEventListener(transitionEvent, function() {
                    self.clickdelay=false              
               });
               this.play()
            }
})
var nav_right = new Vue({
	el:'#nav_right',
	data:{
		rt:'rt',
		div_sides_bg:'div_sides_bg',
	}
})
var right_box_fixed = new Vue({
	el:'#rt_fixed',
	data:{ 
		tel:"13330333303",		
		QQ:'1234567890123',
	},
	methods:{
		
		goTop(){
			var timer  = null;
			 cancelAnimationFrame(timer);//取消帧动画
    		timer = requestAnimationFrame(function fn(){//请求帧动画
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;//每次移动50px
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
    
		}
		
	}
})

var hot_sell = new Vue({
	el:'#hot_sell',
	data:{
	hot_sells:[
		{url:'./img/Avalokitesvara/Avalokitesvara1.jpeg'},
		{url:'./img/Buddha/Buddha2.jpeg'},
		{url:'./img/jade/jade3.jpeg'},
		{url:'./img/leaf/leaf2.jpeg'},
		]
	},
	
//	methods:{
//		show_hot_sell_img(){
//			var hot_sell_img_src = $(this).attr('src');
//			window.open(hot_sell_img_src);
//		}
//		
//	}
	
})
var floor = new Vue({
	el:'#floor',
	data:{
		first_Fs:[
		{url:'./img/Avalokitesvara/Avalokitesvara1.jpeg'},
		{url:'./img/Avalokitesvara/Avalokitesvara2.jpeg'},
		{url:'./img/Avalokitesvara/Avalokitesvara3.jpeg'},
		{url:'./img/Avalokitesvara/Avalokitesvara4.jpeg'},
		],
		second_Fs:[
		{url:'./img/Buddha/Buddha1.jpeg'},
		{url:'./img/Buddha/Buddha2.jpeg'},
		{url:'./img/Buddha/Buddha3.jpeg'},
		{url:'./img/Buddha/Buddha4.jpeg'},
		],
		third_Fs:[
		{url:'./img/jade/jade1.jpeg'},
		{url:'./img/jade/jade2.jpeg'},
		{url:'./img/jade/jade3.jpeg'},
		{url:'./img/jade/jade4.jpeg'},
		],
		fourth_Fs:[
		{url:'./img/leaf/leaf1.jpeg'},
		{url:'./img/leaf/leaf2.jpeg'},
		{url:'./img/leaf/leaf3.jpeg'},
		{url:'./img/leaf/leaf4.jpeg'},
		]
	},
	methods:{
		floor_img(){
			var floor_img_src = $(this).attr('src');
	window.open(floor_img_src);
		}
	}
})

var sup_ul = new Vue({
	el:'#sup_ul',
	data:{
		cat:'天猫保障',
		conditions:[
		{text:'7天无理由退货'},
		{text:'100%正品保障'},
		{text:'提供发票'},
		],
		fresh:'新手帮助',
		helps:[
		{text:'免费注册'},
		{text:'开通支付宝'},
		{text:'支付宝充值'},
		{text:'帮助中心'},
		],
		pay_way:'支付方式',
		pays:[
		{text:'支付宝快捷支付'},
		{text:'货到付款'},
		{text:'网上银行支付'},
		],
		sup_shop:'商家支持',
		sups:[
		{text:'商家入驻'},
		{text:'商家中心'},
		{text:'商家成长'},
		{text:'天猫规则'},
		],
	}
})

var footer = new Vue({
	el:'#footer',
	data:{
		footer_link:'1111',
		footer_links:[
		{text:'关于我们|'},
		{text:'联系我们|'},
		{text:'人才招聘|'},
		{text:'商家入驻|'},
		{text:'广告服务|'},
		{text:'友情链接|'},
		{text:'销售联盟'},
		]
	}
	
})

