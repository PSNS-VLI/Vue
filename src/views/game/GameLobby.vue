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
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form :form="form" layout="inline">
          <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
            <a-form-item>
              <tag-select>
                <tag-select-option value="Category1">类目一</tag-select-option>
                <tag-select-option value="Category2">类目二</tag-select-option>
                <tag-select-option value="Category3">类目三</tag-select-option>
                <tag-select-option value="Category4">类目四</tag-select-option>
                <tag-select-option value="Category5">类目五</tag-select-option>
                <tag-select-option value="Category6">类目六</tag-select-option>
                <tag-select-option value="Category7">类目七</tag-select-option>
                <tag-select-option value="Category8">类目八</tag-select-option>
                <tag-select-option value="Category9">类目九</tag-select-option>
                <tag-select-option value="Category10">类目十</tag-select-option>
              </tag-select>
            </a-form-item>
          </standard-form-row>

          <standard-form-row title="其它选项" grid last>
            <a-row>
              <a-col :lg="8" :md="10" :sm="10" :xs="24">
                <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="作者">
                  <a-select
                    style="max-width: 200px; width: 100%;"
                    mode="multiple"
                    placeholder="不限"
                    v-decorator="['author']"
                    @change="handleChange"
                  >
                    <a-select-option value="lisa">王昭君</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="8" :md="10" :sm="10" :xs="24">
                <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
                  <a-select
                    style="max-width: 200px; width: 100%;"
                    placeholder="不限"
                    v-decorator="['rate']"
                  >
                    <a-select-option value="good">优秀</a-select-option>
                    <a-select-option value="normal">普通</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </standard-form-row>
        </a-form>
      </a-card>

      <div class="ant-pro-pages-list-projects-cardList">
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card class="ant-pro-pages-list-projects-card" hoverable @click="onClickCard(item)">
              <img slot="cover" :src="item.cover" :alt="item.title" />
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
    StandardFormRow
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
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
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
        document.querySelector('html').requestFullscreen().then(() => {
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
