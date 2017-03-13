<template>
    <div class="menu-left col-md-3">
        <div class="Introduction">
            <div class="avatar">
                <img src="" alt="" width="100%" height="100%">
            </div>
            <div class="name">
                <span>吴浩宇</span><i>编辑资料</i>
            </div>
            <div class="company">
                北京天投科技信息....
            </div>
            <div class="email">
                <img src="" alt=""><span>wangwenchen@163.com</span>
            </div>
        </div>
        <div class="menu-list">
            <ul>
                <li class="list-father" :class="{'active': isHide}" v-for="(items, index) of menuList" ref="li" @click="isShow(index,$event)">
                    <div>
                        <img :src="items.url" alt=""><span>{{items.text}}</span>
                    </div>
                    <ol :class="{}">
                        <li v-for="(item, index1) of items.menu"><img :src="item.url" alt=""><span>{{item.text}}</span></li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import menuList from '../../assets/js/router'
export default {
    data () {
        return {
            menuList: menuList,
            isHide: false
        }
    },
    created() {
        this.$nextTick(() => {
            console.log(this.$refs.li)
        })
    },
    methods: {
        isShow(index, event) {
            console.log(event)
            console.log(this.$refs.li[index])
            this.isHide = true
        }
    }
}
</script>

<style lang="scss">
.menu-left {
    margin-top: 10px;
    background-color: #fff;
    color: rgb(125, 125, 136);
    .Introduction {
        width: 100%;
        padding: 0 25px;
        .avatar {
            width: 80px;
            height: 80px;
            margin: 40px 0;
            border-radius: 50%;
            padding-left: 55px;
        }
        .name {
            margin-bottom: 20px;
            span {
                font-size: 20px;
            }
            i {
                float: right;
                cursor: pointer;
                display: inlien-block;
                width: 80px;
                height: 24px;
                font-size: 12px;
                line-height: 24px;
                text-align: center;
                color: rgb(181, 181, 181);
                border: 1px solid rgb(181, 181, 181);
            }
        }
        .company {
            fonts-size: 16px;
            margin-bottom: 20px;
        }
        .email {
            margin-bottom: 30px;
            img {
                width: 34px;
                height: 28px;
                margin-right: 10px;
                vertical-align: middle;
            }
            span {
                font-size: 14px;
            }
        }
    }
    .menu-list {
        width: 100%;
        padding: 0 25px;
        ul {
            li {
                img {
                    width: 34px;
                    height: 28px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                span {
                    font-size: 14px;
                }
                ol {
                    margin-left: 40px;
                    li {
                        height: 36px;
                        line-height: 36px;
                    }
                }
            }
            .list-father {
                div {
                    height: 36px;
                    line-height: 36px;
                }
            }
        }
        
    }
}
</style>