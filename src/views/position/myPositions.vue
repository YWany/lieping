<template>
    <div class="myPositions">
        <div class='currentNav'>当前位置: 我的职位</div>
        <Tabs size="small" @on-click="handleTabRemove">
            <TabPane label="我的职位">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="进行中">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="underwayHeader" :data="underway"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists2'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="录用待入职">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="employHeader" :data="employ"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="入职未过保">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="entryHeader" :data="entry"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="已过保">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="protectionHeader" :data="protection"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="离职补人">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="dimissionHeader" :data="dimission"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="暂缓">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="postponeHeader" :data="postpone"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="已终止">
                <form class="searches">
                    <div class="search">
                        <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                        <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                <Option value="职位名称">职位名称</Option>
                                <Option value="公司名称">公司名称</Option>
                            </Select>
                        <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                    <div class="sels">
                        <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                <Option value="部门归属1">部门归属1</Option>
                                <Option value="部门归属2">部门归属2</Option>
                            </Select>
                        <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                <Option value="未开始">未开始</Option>
                                <Option value="进行中">进行中</Option>
                                <Option value="录用待入职">录用待入职</Option>
                                <Option value="客户行业2">客户行业2</Option>
                                <Option value="客户行业1">客户行业1</Option>
                                <Option value="客户行业2">客户行业2</Option>
                            </Select>
                        <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                <Option value="客户来源1">客户来源1</Option>
                                <Option value="客户来源2">客户来源2</Option>
                            </Select>
                        <div class="disInB sels-item">
                            创建时间:
                            <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <div class="disInB sels-item">
                            更新时间:
                            <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                        </div>
                        <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                        <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                    </div>
                </form>
                <div class="searchTable">
                    <Table border ref="selection" :columns="terminationHeader" :data="termination"></Table>
                    <div class="tablePage fr">
                        <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <!-- <Modal v-model="companyPop" :closable='false' :mask-closable='false' style='text-align:center'>
                <div slot='header' style='font-size:14px;color:#444'>
                    <span v-if='companyMod'>编辑企业</span>
                    <span v-else>新增企业</span>
                    <a href="javascript:;" @click='$parent.companyPop=false'>
                        <Icon type="close" class='fr'></Icon>
                    </a>
                </div>
                <ul class="company-content">
                    <li>
                        <p>
                            <span>*</span> 客户名称：</p>
                        <Input v-model='companyForm.companyName' placeholder="" class='selpro'></Input>
                    </li>
                    <li>
                        <p>
                            <span>*</span> 客户来源：</p>
    
                        <Select v-model='companyForm.companySource' style="width:300px">
                            <Option v-for="(source,index) in sourcelist" :value="source.code" :key='index'>{{source.codeText}}</Option>
    
                        </Select>
                    </li>  
                </ul>
                <div slot='footer' style='text-align:center'>
                    <Button type='info' @click='subSave' v-if='companyMod'>保存编辑</Button>
                    <Button type='info' @click='subSave' v-else>保存</Button>
                </div>
            </Modal> -->
        <Modal v-model="defe" title="暂缓职位">
            <p class="pone">企业名称：{{ workcompany }}</p>
            <p class="pone">职位名称： {{ workname }}</p>
            <p class="pone">主要顾问： 郎超</p>
            <p class="pone">BD顾问： 郎超</p>
            <ul class="company-content">
                <li class="company-li">
                    <p>
                        <span></span> 提出暂缓方：</p>
    
                    <Select v-model='defeform.proposedParty' style="width:300px">
                            <Option v-for="(pro,index) in proposedParty" :value="pro.code" :key='index'>{{pro.codeText}}</Option>
    
                        </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 暂缓理由：</p>
                    <Input v-model='defeform.proposedReason' placeholder="请输入" type="textarea" :rows="2"></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSavedefe'>提交审批</Button>
            </div>
        </Modal>
        <Modal v-model="terminationb" title="终止职位">
            <p class="pone">企业名称：{{ workcompanys }}</p>
            <p class="pone">职位名称： {{ worknames }}</p>
            <p class="pone">主要顾问： 郎超</p>
            <p class="pone">BD顾问： 郎超</p>
            <ul class="company-content">
                <li class="company-li">
                    <p>
                        <span></span> 职位：</p>
                    <Select v-model='terminationform.proposedParty' style="width:300px">
                            <Option v-for="(prot,index) in proposedParty" :value="prot.code" :key='index'>{{prot.codeText}}</Option>
    
                        </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 特别说明：</p>
                    <Input v-model='terminationform.proposedReason' placeholder="请输入" type="textarea" :rows="2"></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSavetermination'>提交审批</Button>
            </div>
        </Modal>
        <Modal v-model="sharereleases" title="共享发布">
            <ul class="company-content">
                <li class="company-li">
                    <p>
                        <span>*</span> 职位：</p>
                    <Select v-model='terminationform.proposedParty' style="width:300px">
                            <Option v-for="(prot,index) in proposedParty" :value="prot.code" :key='index'>{{prot.codeText}}</Option>
                        </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 年薪范围：</p>
                    <Input v-model='terminationform.proposedReason' placeholder="请输入" style="width:90px"></Input>-
                    <Input v-model='terminationform.proposedReason' placeholder="请输入" style="width:90px"></Input> w
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 工作地：</p>
                    <Select v-model='terminationform.proposedParty' style="width:300px">
                            <Option v-for="(prot,index) in proposedParty" :value="prot.code" :key='index'>{{prot.codeText}}</Option>
                        </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 所属企业：</p>
                    <Input v-model='terminationform.proposedReason' placeholder="请输入企业名"></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 推荐奖励：</p>
                    <Input v-model='terminationform.proposedReason' placeholder="下限2000，上不封顶"></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span></span> 特别说明：</p>
                    <Input v-model='terminationform.proposedReason' placeholder="请输入" type="textarea" :rows="2"></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span></span> 创建人：</p>
                    <Select v-model='terminationform.proposedParty' style="width:300px">
                            <Option v-for="(prot,index) in proposedParty" :value="prot.codeText" :key='index'>{{prot.codeText}}</Option>
                        </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span></span> 创建时间：</p>
                    <DatePicker type="date" placeholder="选择面试时间" format="yyyy-MM-dd HH:mm:ss" v-model="terminationform.proposedParty" @on-change='seltime'></DatePicker>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSavetermination'>保存</Button>
                <Button type='info' @click='subSavetermination'>共享发布</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import api from "@/api";
    import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
    export default {
        name: "myPositions",
        components: {},
        data() {
            return {
                proposedParty: this.$store.state.allTrees.proposedParty,
                defe: false, //暂缓按钮
                sharereleases: false,
                workname: "",
                workcompany: "",
                worknames: "",
                workcompanys: "",
                defeform: {
                    jobId: "",
                    proposedParty: "",
                    proposedReason: ""
                },
                terminationb: false, //终止按钮
                terminationform: {
                    jobId: "",
                    proposedParty: "",
                    proposedReason: ""
                },
                sharework: true,
                shareform: {
    
                },
                form: {
                    searchVal: "",
                    selVal: "职位名称",
                    sel1: "",
                    sel2: "",
                    sel3: "",
                    sel4: "",
                    sel5: "",
                    sel6: "",
                    createDate: "",
                    signDate: "",
                    total: 100,
                    pageNum: 1,
                    pageSize: 10
                },
                tableHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.companyId +
                                            "&&jobId=" +
                                            row.id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "joinIn",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "candidateIn",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "interviewIn",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "employeeIn",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "employeeIn",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "quotIn",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "updateTime",
                        width: 80,
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h(
                                "span",
                                (row.updateTime &&
                                    row.updateTime.substr(0, 10)) ||
                                "--"
                            );
                        }
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "bdName",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px",
                                            // color:"#999"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.jobName
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.jobName
                                                );
                                                this.sharereleases=true
                                            }
                                        }
                                    },
                                    "共享发布"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.defeform.jobId = row.id;
                                                this.defe = true;
                                                this.workname = row.jobName
                                                this.workcompany = row.companyName;
                                            }
                                        }
                                    },
                                    "暂缓"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.terminationform.jobId = row.id;
                                                this.terminationb = true;
                                                this.worknames = row.jobName
                                                this.workcompanys = row.companyName;
                                            }
                                        }
                                    },
                                    "终止"
                                )
                            ]);
                        }
                    }
                ],
                underwayHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "jiaRu",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "预推荐",
                        key: "yuTuiJian",
                       
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "tuiJian",
                        
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "待面试",
                        key: "daiMianShi",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "mainShi",
                        width: 60,
                        align: "center"
                    },
                     {
                        title: "面试通过",
                        key: "mianShiTongGuo",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "意向录用",
                        key: "yiXiangLuYong",
                        width: 60,
                        ellipsis: true,
                        align: "center"
                    },
                     {
                        title: "OFFER谈判",
                        key: "offerTanPan",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },  
                    {
                        title: "更新时间",
                        key: "updateTime",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "updateContent",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "jobRunTime",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.jobName
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.jobName
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                employHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "jiaRu",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "tuiJian",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "mianShi",
                        width: 80,
                        align: "center"
                    },
                   
                    {
                        title: "更新时间",
                        key: "updateTime",
                        width: 80,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "updateContent",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "jobRunTime",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                entryHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司名称",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "phone",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "bbb",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "ccc",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "ddd",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "eee",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "fff",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "ggg",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                protectionHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司名称",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "phone",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "bbb",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "ccc",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "ddd",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "eee",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "fff",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "ggg",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                dimissionHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司名称",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "phone",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "bbb",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "ccc",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "ddd",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "eee",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "fff",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "ggg",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                postponeHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司名称",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "phone",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "bbb",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "ccc",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "ddd",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "eee",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "fff",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "ggg",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                terminationHeader: [{
                        title: "职位名称",
                        key: "jobName",
                        width: 140,
                        align: "center",
                        render: (h, params) => {
                            var row = params.row;
                            ls.set("jobname", row.jobName);
                            ls.set("jobcompanyname", row.companyName);
                            return h(
                                "router-link", {
                                    attrs: {
                                        to: "/position/myPositions/doing?jodId=" +
                                            row.id +
                                            "&&jobName=" +
                                            row.jobName +
                                            "&&companyName=" +
                                            row.companyName +
                                            "&&companyid=" +
                                            row.company_id
                                    }
                                },
                                row.jobName
                            );
                        }
                    },
                    {
                        title: "公司名称",
                        key: "companyName",
                        width: 140,
                        sortable: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "加入职位",
                        key: "phone",
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "推荐",
                        key: "bbb",
                        sortable: true,
                        width: 94,
                        align: "center"
                    },
                    {
                        title: "面试",
                        key: "ccc",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "录用",
                        key: "ddd",
                        width: 65,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "入职",
                        key: "eee",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "过保",
                        key: "fff",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新时间",
                        key: "ggg",
                        width: 65,
                        align: "center"
                    },
                    {
                        title: "更新内容",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "职位运作时长",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "主要顾问",
                        key: "hhh",
                        width: 85,
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "iii",
                        align: "center",
                        render: (h, params) => {
                            const row = params.row;
                            return h("div", [
                                h(
                                    "a", {
                                        props: {
                                            type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "编辑!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "a", {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "共享发布!!!" + row.name
                                                );
                                            }
                                        }
                                    },
                                    "共享发布"
                                )
                            ]);
                        }
                    }
                ],
                tableLists: [], //我的职位list
                underway: [], //进行中职位list
                employ: [], //录用待入职list
                entry: [], //入职未过保list
                protection: [], //过保list
                dimission: [], //离职补人list
                postpone: [], //暂缓list
                termination: [] //终止list
            };
        },
        methods: {
            loadLists(page) {
                this.$store.state.spinShow = true;
                this.form.pageNum = page;
                api.axs("post", "/job/myJobPages", this.form).then(({
                    data
                }) => {
                    if (data.code === "SUCCESS") {
                        this.tableLists = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
            },
             loadLists2(page) {
                this.$store.state.spinShow = true;
                this.form.pageNum = page;
                api.axs("post", "/job/queryMyRunningonJobs", this.form).then(({
                    data
                }) => {
                    if (data.code === "SUCCESS") {
                        this.underway = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
            },
             loadLists3(page) {
                this.$store.state.spinShow = true;
                this.form.pageNum = page;
                api.axs("post", "/job/queryMyPendingPostJobs", this.form).then(({
                    data
                }) => {
                    if (data.code === "SUCCESS") {
                        this.employ = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
            },
            reset(key) {
                Object.keys(this[key]).forEach(item => {
                    this[key][item] = "";
                });
                this.form.selVal = "企业名称";
            },
            statechange(data) {
                ls.set("jobstate", data);
            },
            handleTabRemove(name) {
                
            },
            seltime(data){
                this.terminationform.proposedParty=data
            },
            subSavedefe() {
                if (!this.defeform.proposedReason) {
                    this.$Message.error("请填写暂缓理由");
                    return;
                }
                api.axs("post", "/job/jobPause", this.defeform).then(({
                    data
                }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.defe = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
            },
            subSavetermination() {
                if (!this.terminationform.proposedReason) {
                    this.$Message.error("请填写终止理由");
                    return;
                }
                api.axs("post", "/job/jobStop", this.terminationform).then(({
                    data
                }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.terminationb = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
            }
        },
        mounted() {
            this.loadLists();
            this.loadLists2();
             this.loadLists3();
            this.$store.state.spinShow = false;
            // api.axs("post", "/job/myJobPages").then(({ data }) => {
            //     if (data.code === "SUCCESS") {
            //       this.tableLists=data.data.list
            //     } else {
            //         this.$Message.error(data.remark);
            //     }
            // });
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .tab {
        width: 100%;
        //  clear: both;
        //   content: "";
        // visibility: hidden;
        // height: 0;
        li {
            float: left;
            margin-right: 10px;
            font-size: 14px;
            padding: 5px 0;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .active {
            color: #0066ff;
            border-bottom: 1px solid #0066ff;
        }
    }
    
    .pone {
        padding-left: 20px;
        margin: 10px 0;
        line-height: 20px;
    }
    
    .company-content {
        .company-li {
            margin-bottom: 10px;
            .selpro {
                .ivu-input {
                    text-align: center;
                }
            }
            p {
                display: inline-block;
                width: 80px;
                line-height: 32px;
                text-align: right;
                color: #444;
                margin-right: 10px;
                span {
                    color: #ff8686;
                }
            }
            .ivu-input-wrapper {
                width: 300px;
            }
        }
    }
</style>
