<script lang="ts" setup>
import { mainStore } from '@/store'
import { updateAfterPunch } from '@/api/update'
import { ref } from 'vue'
import router from '@/router'
import { Selects } from '@/utils/model/selects'

const store = mainStore()

const user = ref(store.user)

var phone: any, judge1: any, judge2: any, judge3: any, judge4: any, judge5: any, checkbox: any, agreement: any

function submit() {
  if (custCheck()) {
    let selects: Selects = {
      select0: judge1[0].checked == true ? 0 : 1,
      select1: judge2[0].checked == true ? 0 : 1,
      select2: judge3[0].cheched == true ? 1 : 0,
      select3: judge4[0].checked == true ? 0 : 1,
      select4: judge5[0].checked == true ? 0 : 1,
      phone: phone.value,
      select5: ''
    }
    let check: string[] = []
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked ? check.push(checkbox[i].value) : ''
    }
    selects.select5 = check.toString()
    updateAfterPunch(user.value, selects).then((res) => {
      store.$patch((state) => {
        state.user = res.data.user
      })
    })
    router.push('/user/home')
  } else {
  }
}

function custCheck() {
  phone = document.getElementById('phone')
  judge1 = document.getElementsByName('0')
  judge2 = document.getElementsByName('1')
  judge3 = document.getElementsByName('2')
  judge4 = document.getElementsByName('3')
  judge5 = document.getElementsByName('4')
  checkbox = document.getElementsByName('5')
  agreement = document.getElementsByName('6')
  if (phone.value.length == 0) {
    alert('手机号不能为空')
    return false
  }
  if (!judge1[0].checked && !judge1[1].checked) {
    alert('第1题是必选题，请确认是否填写！')
    return false
  } else if (!judge2[0].checked && !judge2[1].checked) {
    alert('第2题是必选题，请确认是否填写！')
    return false
  } else if (!judge3[0].checked && !judge3[1].checked) {
    alert('第3题是必选题，请确认是否填写！')
    return false
  } else if (!judge4[0].checked && !judge4[1].checked) {
    alert('第4题是必选题，请确认是否填写！')
    return false
  } else if (!judge5[0].checked && !judge5[1].checked && !judge5[2].checked && !judge5[3].checked) {
    alert('第5题是必选题，请确认是否填写！')
    return false
  } else if (
    !checkbox[0].checked &&
    !checkbox[1].checked &&
    !checkbox[2].checked &&
    !checkbox[3].checked &&
    !checkbox[4].checked &&
    !checkbox[5].checked &&
    !checkbox[6].checked &&
    !checkbox[7].cheched
  ) {
    alert('第6题是必选题，请确认是否填写！')
    return false
  } else if (!agreement[0].checked) {
    alert('请确认是否同意承诺！')
    return false
  } else if (
    checkbox[0].checked &&
    (checkbox[1].checked ||
      checkbox[2].checked ||
      checkbox[3].checked ||
      checkbox[4].checked ||
      checkbox[5].checked ||
      checkbox[6].checked ||
      checkbox[7].checked)
  ) {
    alert('第5题填选有误！')
    return false
  }
  return true
}
</script>

<template>
  <Back class="fixed" />
  <div class="scroll h-screen overflow-auto">
    <div class="m-auto flex flex-wrap w-[400px] space-y-4 bg-gray-200">
      <div>
        <img class="w-[400px] h-[130px]" src="../../../static/form.png" />
      </div>
      <div class="px-2">
        姓名:
        <div>
          <input type="text" :value="user.user_name" Readonly="divue" />
        </div>
      </div>
      <div class="px-2">
        身份证号:
        <div>
          <input type="text" :value="user.person_id" Readonly="divue" />
        </div>
      </div>

      <div class="px-2">
        工号或学号:
        <div>
          <input type="text" :value="user.user_id" Readonly="divue" />
        </div>
      </div>

      <div class="px-2">
        手机号:
        <div>
          <input class="read" type="text" :value="user.phone" id="phone" name="phone" />
        </div>
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        本人近期（14天内）是否去过重点疫区？
        <span class="single">单选</span>
        <br />
        <br />
        <input type="radio" name="0" id="0" value="0" />
        <span>否</span>
        <hr width="330" color="#F6F6F6" size="1" />
        <br />
        <input type="radio" name="0" id="10" value="1" />
        <span>是</span>
        <br />
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        本人近期（14天内）是否去过国外？
        <span class="single">单选</span>
        <br />
        <br />
        <input type="radio" name="1" id="1" value="0" />
        <span>否</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="1" id="11" value="1" />
        <span>是</span>
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        本人近期（14天内）是否接触过新冠确诊病人或疑似病人？
        <span class="single">单选</span>
        <br />
        <br />
        <input type="radio" name="2" id="2" value="0" />
        <span>否</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="2" id="12" value="1" />
        <span>是</span>
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        本人是否被卫生部门确认为新冠肺炎确诊病例或疑似病例？
        <span class="single">单选</span>
        <br />
        <br />
        <input type="radio" name="3" id="3" />
        <span>否</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="3" id="13" />
        <span>是</span>
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        本人是否打过新冠疫苗？
        <span class="single">单选</span>
        <br />
        <br />
        <input type="radio" name="4" id="4" />
        <span>未打过</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="4" id="14" />
        <span>已打1针</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="4" id="24" />
        <span>已打2针</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="radio" name="4" id="34" />
        <span>已打3针</span>
      </div>
      <div class="px-2">
        <span class="text-orange-400">*</span>
        当前健康状况（若有以下状况，请在方框内勾选）
        <span class="multi">多选</span>
        <br />
        <br />
        <input type="checkbox" name="5" id="5" value="checkbox0" />
        <span>无异常</span>
        <hr swidth="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="15" value="checkbox1" />
        <span>发烧（>=37.3℃）</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="25" value="checkbox2" />
        <span>乏力</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="35" value="checkbox3" />
        <span>干咳</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="45" value="checkbox4" />
        <span>鼻塞</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="55" value="checkbox5" />
        <span>流涕</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="65" value="checkbox6" />
        <span>咽痛</span>
        <hr width="330" color="#F6F6F6" />
        <br />
        <input type="checkbox" name="5" id="75" value="checkbox7" />
        <span>腹泻</span>
      </div>
      <div class="px-2">
        <span class="text-xl font-bold">本人郑重承诺：</span>
        <br />
        <br />
        <input type="checkbox" name="6" id="6" />
        <span>填报信息真实，愿意承担相应的法律责任。</span>
      </div>
      <div height="100px" class="bg-gray-200 w-full flex justify-center">
        <Button class="m-3 py-2 bg-blue-500 text-xl w-40 text-center hover:bg-blue-500/50" @click="submit()">
          提交
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  outline: none;
  padding-left: 10px;
  margin: auto;
  border-radius: 15px;
  color: #00000084;
  background-color: rgba(0, 0, 0, 0.05);
}

td {
  padding: 3px;
}

.read {
  color: #000000;
  background-color: rgba(255, 255, 255, 0.274);
}

.read:focus {
  background-color: rgba(255, 255, 255, 0.829);
}

.single {
  border: 1px solid #164a98;
  padding: 1px 1px 1px 1px;
  width: 27px;
  border-radius: 25px;
  color: #3f6fb8;
  font-size: 70%;
  white-space: nowrap;
}

.multi {
  border: 1px solid #ffa500;
  padding: 1px 1px 1px 1px;
  width: 27px;
  border-radius: 25px;
  color: orange;
  font-size: 70%;
}
</style>
