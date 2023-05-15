<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" style="width: 80%; max-width: 522px;">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
      </div>
    </template>
    <template v-slot:extraContent>
      <div style="width: 155px; margin-top: -20px;"><img style="width: 100%" :src="extraImage" /></div>
    </template>
    <div>
      <a-card :bordered="false">
        <!-- <div>
          <a-carousel arrows effect="fade" autoplay class="banner">
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px;zIndex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="item in 3" :key="item">
              <span
                class="banner-image"
                :style="{ backgroundImage: 'url(' + require(`@/games/1/raw/mockup${item}.png`) + ')' }"></span>
            </div>
          </a-carousel>
        </div> -->
      </a-card>
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form :form="form" layout="inline">
          <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
            <a-form-item>
              <tag-select>
                <tag-select-option value="Category1">卡牌</tag-select-option>
                <tag-select-option value="Category2">策略</tag-select-option>
              </tag-select>
            </a-form-item>
          </standard-form-row>
        </a-form>
      </a-card>
      <div class="ant-pro-pages-list-projects-cardList">
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card class="ant-pro-pages-list-projects-card" hoverable @click="onClickCard(item)">
              <img slot="cover" :src="require('@/games/1/raw/mockup1.png')" :alt="item.title" />
              <a-card-meta :title="item.title">
                <template slot="description">
                  <ellipsis :length="50">{{ item.description }}</ellipsis>
                </template>
              </a-card-meta>
              <div class="cardItemContent">
                <span>{{ item.updatedAt | fromNow }}</span>
                <div class="avatarList">
                  <avatar-list size="small" :max-length="2">
                    <avatar-list-item
                      v-for="(member, i) in item.members"
                      :key="`${item.id}-avatar-${i}`"
                      :src="member.avatar"
                      :tips="member.name"
                    />
                  </avatar-list>
                </div>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { Carousel } from 'ant-design-vue'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    'a-carousel': Carousel
  },
  data () {
    this.extraImage = 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png'
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      search: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 1 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    onClickCard (cardItem) {
      this.$router.push({
        name: 'general-game',
        params: { id: cardItem.id.toString() }
      }, () => {
        document.documentElement.requestFullscreen().then(() => {
          this.$notification.info({
            message: '已开启游戏模式',
            description: '您已经进入游戏模式，按ESC即可退出',
            placement: 'topLeft',
            top: '100px'
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.banner-image {
  display: inline-block;
  width: 100%;
  height: 640px;
  background-size: 100% 100%;
}
.ant-carousel{
  :deep(.slick-slide) {
    text-align: center;
    height: 640px;
    line-height: 640px;
    background: #364d79;
    overflow: hidden;
  }
  :deep(.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  :deep(.custom-slick-arrow:before) {
    display: none;
  }
  :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
  }
  :deep(.slick-slide h3) {
    color: #fff;
  }
}
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
.ant-pro-components-tag-select {
  :deep(.ant-pro-tag-select .ant-tag) {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  :deep(.ant-card-meta-title) {
    margin-bottom: 4px;
  }

  :deep(.ant-card-meta-description) {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    :deep(.ant-pro-avatar-list) {
      flex: 0 1 auto;
    }
  }
}
</style>
