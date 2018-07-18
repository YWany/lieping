<template>
	<div class="customer">
		<div class='currentNav'>当前位置: 权限管理
		</div>
		<ul class="rolelist">
			<li v-for="(todo, index) in todos" v-on:click="addClass(index)" v-bind:class="{ active:index==current}" :key="index" :value="todo.id"> {{ todo.roleName }}
			</li>

			<Button type="ghost" @click="modal1 = true">
				<Icon type="plus-circled"></Icon>添加角色</Button>
			<Button type="ghost" @click="modal4 = true">
				<Icon type="minus-circled"></Icon>删除角色</Button>

			<Modal v-model="modal1" title="新增角色" @on-ok="ok" @on-cancel="cancel">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="角色名" prop="roleName">
						<Input v-model="formValidate.roleName" placeholder="请输入角色名"></Input>
					</FormItem>
					<FormItem label="系统内角色" prop="roleType">
						<Select v-model="formValidate.roleType" placeholder="是否对外">
							<Option value="1">是</Option>
							<Option value="2">否</Option>
						</Select>
					</FormItem>
				</Form>
				<div slot="footer">

					<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>

				</div>
			</Modal>
			<Modal v-model="modal4" title="删除角色" @on-ok="ok" @on-cancel="cancel">
				<Form ref="formValidatedel" :model="formValidatedel" :rules="ruleValidatedel" :label-width="80">

					<FormItem label="选择角色" prop="menuId">
						<Select v-model="formValidatedel.menuId" placeholder="选择权限">
							<Option v-for="(todo, index) in todos" :value="todo.id" :key='index'>{{ todo.roleName }}</Option>

						</Select>
					</FormItem>

				</Form>
				<div slot="footer">

					<Button type="primary" @click="handleSubmit3('formValidatedel')">删除</Button>
					<Button type="ghost" @click="handleReset3('formValidatedel')" style="margin-left: 8px">清空表格</Button>

				</div>
			</Modal>
			<Modal v-model="modal2" title="新增权限" @on-ok="ok" @on-cancel="cancel">
				<Form ref="formValidatepro" :model="formValidatepro" :rules="ruleValidatepro" :label-width="80">
					<FormItem label="权限名" prop="roleName">
						<Input v-model="formValidatepro.roleName" placeholder="请输入权限名"></Input>
					</FormItem>
					<FormItem label="权限分类" prop="menuId">
						<Select v-model="formValidatepro.menuId" placeholder="选择权限">
							<Option v-for="(roles,index) in roles" :value="roles.id" :key='index'>{{roles.name}}</Option>

						</Select>
					</FormItem>
				</Form>
				<div slot="footer">

					<Button type="primary" @click="handleSubmit1('formValidatepro')">保存</Button>
					<Button type="ghost" @click="handleReset1('formValidatepro')" style="margin-left: 8px">清空表格</Button>

				</div>
			</Modal>
			<Modal v-model="modal3" title="删除权限" @on-ok="ok" @on-cancel="cancel">
				<Form ref="formValidateprodel" :model="formValidateprodel" :rules="ruleValidateprodel" :label-width="80">

					<FormItem label="权限分类" prop="menuId">
						<Select v-model="formValidateprodel.menuId" placeholder="选择权限">
							<Option v-for="(roles,index) in roles" :value="roles.id" :key='index'>{{roles.name}}</Option>

						</Select>
					</FormItem>
					<FormItem label="权限名" prop="menuId">
						<Select v-model="formValidateprodel.menuId" placeholder="选择权限">
							<Option v-for="(roles,index) in roles" :value="roles.id" :key='index'>{{roles.name}}</Option>

						</Select>
					</FormItem>
				</Form>
				<div slot="footer">

					<Button type="primary" @click="handleSubmit2('formValidateprodel')">保存</Button>
					<Button type="ghost" @click="handleReset2('formValidateprodel')" style="margin-left: 8px">清空表格</Button>

				</div>
			</Modal>

		</ul>
		<div class="bomt">
			<ul class="aulist">
				<li v-for="(roles, index) in roles" v-on:click="addroleClass(index)" v-bind:class="{ active1:index==roleclass}" :key="index" :value="roles.id"> {{ roles.name }}</li>
				<Button class="aubut" type="ghost" @click="modal2 = true">
					<Icon type="plus-circled"></Icon>添加权限</Button>
				<!-- <Button class="aubut" type="ghost" @click="modal3 = true"><Icon type="minus-circled"></Icon>删除权限</Button> -->

			</ul>
			<div class="radol">
				<div class="radiolist1" v-show="clickId==0">
					<CheckboxGroup v-model="fruit1">
						<Checkbox label="香蕉"></Checkbox>
						<Checkbox label="苹果"></Checkbox>
						<Checkbox label="西瓜"></Checkbox>
					</CheckboxGroup>

				</div>
				<div class="radiolist2" v-show="clickId==1">
					<CheckboxGroup v-model="fruit2">
						<Checkbox label="sdsd"></Checkbox>
						<Checkbox label="sdsdsd"></Checkbox>
						<Checkbox label="sdsvsd"></Checkbox>
					</CheckboxGroup>

				</div>
				<div class="radiolist3" v-show="clickId==2">
					<CheckboxGroup v-model="fruit3">
						<Checkbox label="111"></Checkbox>
						<Checkbox label="232"></Checkbox>
						<Checkbox label="333"></Checkbox>
					</CheckboxGroup>

				</div>
				<Button class="save" type="primary">保存</Button>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
    name: "home",
    components: {
        Menu,
        HelloWorld
    },
    data() {
        return {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            roleid: "",
            promisssid: "",
            rolelist: [],
            fruit1: ["苹果"],
            fruit2: ["苹果"],
            fruit3: ["苹果"],
            clickId: 0,
            current: 0,
            roleclass: 0,
            todos: [],
            roles: [],
            formValidate: {
                roleName: "",

                roleType: "1"
            },
            formValidatedel: {
                menuId: ""
            },
            formValidatepro: {
                roleName: "",

                menuId: ""
            },
            formValidateprodel: {
                roleName: "",

                menuId: ""
            },

            ruleValidate: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名",
                        trigger: "blur"
                    }
                ]
            },
            ruleValidatedel: {
                menuId: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "change"
                    }
                ]
            },
            ruleValidatepro: {
                roleName: [
                    {
                        required: true,
                        message: "请输入权限名",
                        trigger: "blur"
                    }
                ],
                menuId: [
                    {
                        required: true,
                        message: "请选择权限类型",
                        trigger: "change"
                    }
                ]
            },
            ruleValidateprodel: {
                roleName: [
                    {
                        required: true,
                        message: "请输入权限名",
                        trigger: "blur"
                    }
                ],
                menuId: [
                    {
                        required: true,
                        message: "请选择权限类型",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        Init: function() {
            var _this = this;

            api
                .axs("post", "/role/info", {})
                .then(({ data: { data, code } }) => {
                    _this.todos = data;
                    _this.roleid = _this.todos[0].id;
                    console.log(_this.roleid);
                    api
                        .axs("post", "/menu/info", {
                            parentId: "10"
                        })
                        .then(({ data: { data, code } }) => {
                            _this.roles = data;
                            _this.promisssid = _this.roles[0].id;
                            console.log(_this.promisssid);
                            api
                                .axs("post", "/menu/selectPermissionByMenuId", {
                                    menuId: _this.promisssid,
                                    roleId: _this.roleid
                                })
                                .then(({ data: { data, code } }) => {
                                    console.log(data.permissions);
                                });
                        });
                });
        },

        ok() {
            this.$Message.info("Clicked ok");
        },
        addClass: function(index) {
            this.current = index;
        },
        addroleClass: function(index) {
            this.roleclass = index;
            this.clickId = index;
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        },

        // 新增角色
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log(this.formValidate);

                    api
                        .axs("post", "/role/save", {
                            roleName: this.formValidate.roleName,
                            roleType: this.formValidate.roleType
                        })
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.modal1 = false;
                                this.Init();
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },

        // 新增权限
        handleSubmit1(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .axs("post", "/permission/save", {
                            name: this.formValidatepro.roleName,
                            menuId: this.formValidatepro.menuId,
                            permission: "add"
                        })
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.modal2 = false;
                                this.Init();
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset1(name) {
            this.$refs[name].resetFields();
        },
        // 删除角色
        handleSubmit3(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log(this.formValidatedel);
                    api
                        .axs("post", "/role/delete", {
                            id: this.formValidatedel.menuId
                        })
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.modal4 = false;
                                this.Init();
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset3(name) {
            this.$refs[name].resetFields();
        },
        // 删除权限
        handleSubmit2(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log(this.formValidate);

                    api
                        .axs("post", "/permission/save", {
                            name: this.formValidatepro.roleName,
                            menuId: this.formValidatepro.menuId,
                            permission: "add"
                        })
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.modal2 = false;
                                this.Init();
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset2(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        this.Init();

        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
.active {
    background: #2d8cf0;
    color: white;
}

.active1 {
    background: #2d8cf0;
    color: white;
}

.rolelist {
    padding: 1rem 1rem; // border: 1px solid #ddd;
    overflow: auto;
    li {
        width: 5.8rem;
        height: 2rem;
        float: left;
        border: 1px solid #ddd;
        margin-right: 0.8rem;
        text-align: center;
        line-height: 2rem;
        border-radius: 5px;
        cursor: pointer;
    }
    li:hover {
        background: #2d8cf0;
        color: white;
    }
}

.bomt {
    width: 100%;
    padding: 1rem 1rem;
    overflow: auto;
    .aulist {
        width: 15%;
        float: left;
        .aubut {
            width: 100%;
            margin-top: 1rem;
        }
        li {
            width: 100%;
            height: 2.5rem;
            text-align: center;
            line-height: 2.5rem;
            border: 1px solid #ddd;
            cursor: pointer;
        }
        li:hover {
            background: #ddd;
            color: white;
        }
    }
    .radol {
        width: 85%;
        border: 1px solid #ddd;
        padding: 1rem 1rem;
        float: right;
        .radiolist1 {
        }
        .save {
            margin: 0 auto;
            margin-left: 45%;
            margin-top: 3rem;
        }
    }
}
</style>
