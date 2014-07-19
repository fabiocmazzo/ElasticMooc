YUI.add("moodle-course-toolboxes",function(e,t){var n={ACTIVITYINSTANCE:"activityinstance",AVAILABILITYINFODIV:"div.availabilityinfo",CONTENTWITHOUTLINK:"contentwithoutlink",CONDITIONALHIDDEN:"conditionalhidden",DIMCLASS:"dimmed",DIMMEDTEXT:"dimmed_text",EDITINSTRUCTIONS:"editinstructions",EDITINGTITLE:"editor_displayed",HIDE:"hide",MODINDENTCOUNT:"mod-indent-",MODINDENTHUGE:"mod-indent-huge",MODULEIDPREFIX:"module-",SECTIONHIDDENCLASS:"hidden",SECTIONIDPREFIX:"section-",SHOW:"editing_show",TITLEEDITOR:"titleeditor"},r={ACTIONAREA:".actions",ACTIONLINKTEXT:".actionlinktext",ACTIVITYACTION:"a.cm-edit-action[data-action], a.editing_title",ACTIVITYFORM:"."+n.ACTIVITYINSTANCE+" form",ACTIVITYICON:"img.activityicon",ACTIVITYINSTANCE:"."+n.ACTIVITYINSTANCE,ACTIVITYLINK:"."+n.ACTIVITYINSTANCE+" > a",ACTIVITYLI:"li.activity",ACTIVITYTITLE:"input[name=title]",COMMANDSPAN:".commands",CONTENTAFTERLINK:"div.contentafterlink",CONTENTWITHOUTLINK:"div.contentwithoutlink",EDITTITLE:"a.editing_title",HIDE:"a.editing_hide",HIGHLIGHT:"a.editing_highlight",INSTANCENAME:"span.instancename",MODINDENTDIV:".mod-indent",MODINDENTOUTER:".mod-indent-outer",PAGECONTENT:"body",SECTIONLI:"li.section",SHOW:"a."+n.SHOW,SHOWHIDE:"a.editing_showhide"},i={MIN:0,MAX:16},s=e.one(document.body);M.course=M.course||{};var o=function(){o.superclass.constructor.apply(this,arguments)};e.extend(o,e.Base,{send_request:function(t,n,r,i){t||(t={});var s=this.get("config").pageparams,o;for(o in s)t[o]=s[o];t.sesskey=M.cfg.sesskey,t.courseId=this.get("courseid");var u=M.cfg.wwwroot+this.get("ajaxurl"),a=[],f={method:"POST",data:t,on:{success:function(t,i){try{a=e.JSON.parse(i.responseText),a.error&&new M.core.ajaxException(a)}catch(s){}r&&e.bind(r,this,a)(),n&&window.setTimeout(function(){n.hide()},400)},failure:function(e,t){n&&n.hide(),new M.core.ajaxException(t)}},context:this};if(i)for(o in i)f[o]=i[o];return n&&n.show(),e.io(u,f),this}},{NAME:"course-toolbox",ATTRS:{courseid:{value:0},format:{value:"topics"},ajaxurl:{value:null},config:{value:{}}}});var u=function(){u.superclass.constructor.apply(this,arguments)};e.extend(u,o,{GROUPS_NONE:0,GROUPS_SEPARATE:1,GROUPS_VISIBLE:2,edittitleevents:[],initializer:function(){M.course.coursebase.register_module(this),s.delegate("key",this.handle_data_action,"down:enter",r.ACTIVITYACTION,this),e.delegate("click",this.handle_data_action,s,r.ACTIVITYACTION,this)},handle_data_action:function(e){var t=e.target;t.test("a")||(t=t.ancestor(r.ACTIVITYACTION));var n=t.getData("action"),i=t.ancestor(r.ACTIVITYLI);if(!t.test("a")||!n||!i)return;switch(n){case"edittitle":this.edit_title(e,t,i,n);break;case"moveleft":case"moveright":this.change_indent(e,t,i,n);break;case"delete":this.delete_with_confirmation(e,t,i,n);break;case"duplicate":this.duplicate(e,t,i,n);break;case"hide":case"show":this.change_visibility(e,t,i,n);break;case"groupsseparate":case"groupsvisible":case"groupsnone":callback="change_groupmode",this.change_groupmode(e,t,i,n);break;case"move":case"update":case"duplicate":case"assignroles":break;default:}},add_spinner:function(t){var n=t.one(r.ACTIONAREA);return n?M.util.add_spinner(e,n):null},change_indent:function(t,s,o,u){t.preventDefault();var a=u==="moveleft"?-1:1,f=o.one(r.MODINDENTDIV),l=f.getAttribute("class").match(/mod-indent-(\d{1,})/),c=0,h;l&&(c=parseInt(l[1],10)),h=c+parseInt(a,10);if(h<i.MIN||h>i.MAX)return;l&&f.removeClass(l[0]),f.addClass(n.MODINDENTCOUNT+h);var p={"class":"resource",field:"indent",value:h,id:e.Moodle.core_course.util.cm.getId(o)},d=this.add_spinner(o);this.send_request(p,d);var v;h===i.MIN?(s.addClass("hidden"),v=o.one(".editing_moveright")):h>i.MIN&&c===i.MIN&&s.ancestor(".menu").one("[data-action=moveleft]").removeClass("hidden"),h===i.MAX?(s.addClass("hidden"),v=o.one(".editing_moveleft")):h<i.MAX&&c===i.MAX&&s.ancestor(".menu").one("[data-action=moveright]").removeClass("hidden");var m=f.hasClass(n.MODINDENTHUGE);h>15&&!m?f.addClass(n.MODINDENTHUGE):h<=15&&m&&f.removeClass(n.MODINDENTHUGE),t.type&&t.type==="key"&&v&&v.focus()},delete_with_confirmation:function(t,n,r){t.preventDefault();var i=r,s="",o={type:M.util.get_string("pluginname",i.getAttribute("class").match(/modtype_([^\s]*)/)[1])};e.Moodle.core_course.util.cm.getName(i)!==null?(o.name=e.Moodle.core_course.util.cm.getName(i),s=M.util.get_string("deletechecktypename","moodle",o)):s=M.util.get_string("deletechecktype","moodle",o);var u=new M.core.confirm({question:s,modal:!0});return u.on("complete-yes",function(){i.remove();var t={"class":"resource",action:"DELETE",id:e.Moodle.core_course.util.cm.getId(i)};this.send_request(t),M.core.actionmenu&&M.core.actionmenu.instance&&M.core.actionmenu.instance.hideMenu()},this),this},duplicate:function(t,n,r){t.preventDefault();var i=r,s=r.ancestor(M.course.format.get_section_selector(e)),o=M.util.add_lightbox(e,s).show(),u={"class":"resource",field:"duplicate",id:e.Moodle.core_course.util.cm.getId(i),sr:n.getData("sr")};return this.send_request(u,o,function(t){var n=e.Node.create(t.fullcontent);r.insert(n,"after"),e.use("moodle-course-coursebase",function(){M.course.coursebase.invoke_function("setup_for_resource",n)}),M.core.actionmenu&&M.core.actionmenu.newDOMNode&&M.core.actionmenu.newDOMNode(n)}),this},change_visibility:function(t,n,r,i){t.preventDefault();var s=r,o=this.handle_resource_dim(n,r,i),u={"class":"resource",field:"visible",value:o,id:e.Moodle.core_course.util.cm.getId(s)},a=this.add_spinner(s);return this.send_request(u,a),this},handle_resource_dim:function(t,i,s){var o=n.DIMCLASS,u=i.one([r.ACTIVITYLINK,r.CONTENTWITHOUTLINK].join(", ")),a=i.one(n.AVAILABILITYINFODIV),f=s==="hide"?"show":"hide",l=t.one("span"),c=M.util.get_string(f,"moodle"),h=t.one("img");return h.setAttrs({src:M.util.image_url("t/"+f)}),e.Lang.trim(t.getAttribute("title"))&&t.setAttribute("title",c),e.Lang.trim(h.getAttribute("alt"))&&h.setAttribute("alt",c),t.replaceClass("editing_"+s,"editing_"+f),t.setData("action",f),l&&l.set("text",c),i.one(r.CONTENTWITHOUTLINK)&&(u=
i.one(r.CONTENTWITHOUTLINK),o=n.DIMMEDTEXT),u.hasClass(n.CONDITIONALHIDDEN)||(u.toggleClass(o),i.all(r.CONTENTAFTERLINK).toggleClass(n.DIMMEDTEXT)),a&&a.toggleClass(n.HIDE),s==="hide"?0:1},change_groupmode:function(t,n,r){t.preventDefault();var i=parseInt(n.getData("nextgroupmode"),10),s="",o="",u,a,f,l=i+1,c=n.one("img");return l>2&&(l=0),i===this.GROUPS_NONE?(s="groupsnone",o=M.util.image_url("i/groupn","moodle")):i===this.GROUPS_SEPARATE?(s="groupsseparate",o=M.util.image_url("i/groups","moodle")):i===this.GROUPS_VISIBLE&&(s="groupsvisible",o=M.util.image_url("i/groupv","moodle")),u=M.util.get_string("clicktochangeinbrackets","moodle",M.util.get_string(s,"moodle")),c.setAttrs({src:o}),e.Lang.trim(n.getAttribute("title"))&&n.setAttribute("title",u).setData("action",s).setData("nextgroupmode",l),e.Lang.trim(c.getAttribute("alt"))&&c.setAttribute("alt",u),a={"class":"resource",field:"groupmode",value:i,id:e.Moodle.core_course.util.cm.getId(r)},f=this.add_spinner(r),this.send_request(a,f),this},edit_title:function(t,i,s){var o=e.Moodle.core_course.util.cm.getId(s),u=s.one(r.INSTANCENAME),a=s.one(r.ACTIVITYINSTANCE),f=u.get("firstChild"),l=f.get("data"),c=l,h,p=u.ancestor("a"),d={"class":"resource",field:"gettitle",id:o};return t.preventDefault(),this.send_request(d,null,function(t){M.core.actionmenu&&M.core.actionmenu.instance&&M.core.actionmenu.instance.hideMenu(),t.instancename&&(c=t.instancename);var i=e.Node.create('<form action="#" />'),o=e.Node.create('<span class="'+n.EDITINSTRUCTIONS+'" id="id_editinstructions" />').set("innerHTML",M.util.get_string("edittitleinstructions","moodle")),u=e.Node.create('<input name="title" type="text" class="'+n.TITLEEDITOR+'" />').setAttrs({value:c,autocomplete:"off","aria-describedby":"id_editinstructions",maxLength:"255"});i.appendChild(s.one(r.ACTIVITYICON).cloneNode()),i.appendChild(u),i.setData("anchor",p),a.insert(o,"before"),p.replace(i);var f="left";right_to_left()&&(f="right"),s.addClass(n.EDITINGTITLE),u.focus().select(),h=u.on("blur",this.edit_title_cancel,this,s,!1),this.edittitleevents.push(h),h=u.on("key",this.edit_title_cancel,"esc",this,s,!0),this.edittitleevents.push(h),h=i.on("submit",this.edit_title_submit,this,s,l),this.edittitleevents.push(h)}),this},edit_title_submit:function(t,n,i){t.preventDefault();var s=e.Lang.trim(n.one(r.ACTIVITYFORM+" "+r.ACTIVITYTITLE).get("value"));this.edit_title_clear(n);var o=this.add_spinner(n);if(s!==null&&s!==""&&s!==i){var u={"class":"resource",field:"updatetitle",title:s,id:e.Moodle.core_course.util.cm.getId(n)};this.send_request(u,o,function(e){e.instancename&&n.one(r.INSTANCENAME).setContent(e.instancename)})}},edit_title_cancel:function(e,t,n){n&&e.preventDefault(),this.edit_title_clear(t)},edit_title_clear:function(t){(new e.EventHandle(this.edittitleevents)).detach();var i=t.one(r.ACTIVITYFORM),s=t.one("#id_editinstructions");i&&i.replace(i.getData("anchor")),s&&s.remove(),t.removeClass(n.EDITINGTITLE),e.later(100,this,function(){t.one(r.EDITTITLE).focus()})},set_visibility_resource_ui:function(e){var t=e.element,n=t.one(r.HIDE),i=!0,s=!1;n||(n=t.one(r.SHOW),i=!1,s=!0),typeof e.visible!="undefined"&&(s=e.visible);if(i!==s){var o="hide";s&&(o="show"),this.handle_resource_dim(n,t,o)}}},{NAME:"course-resource-toolbox",ATTRS:{}}),M.course.resource_toolbox=null,M.course.init_resource_toolbox=function(e){return M.course.resource_toolbox=new u(e),M.course.resource_toolbox};var a=function(){a.superclass.constructor.apply(this,arguments)};e.extend(a,o,{initializer:function(){M.course.coursebase.register_module(this),e.delegate("click",this.toggle_highlight,r.PAGECONTENT,r.SECTIONLI+" "+r.HIGHLIGHT,this),e.delegate("click",this.toggle_hide_section,r.PAGECONTENT,r.SECTIONLI+" "+r.SHOWHIDE,this)},toggle_hide_section:function(t){t.preventDefault();var i=t.target.ancestor(M.course.format.get_section_selector(e)),s=t.target.ancestor("a",!0),o=s.one("img"),u,a,f;i.hasClass(n.SECTIONHIDDENCLASS)?(i.removeClass(n.SECTIONHIDDENCLASS),u=1,a="show",f="hide"):(i.addClass(n.SECTIONHIDDENCLASS),u=0,a="hide",f="show");var l=M.util.get_string(f+"fromothers","format_"+this.get("format"));o.setAttrs({alt:l,src:M.util.image_url("i/"+f)}),s.set("title",l);var c={"class":"section",field:"visible",id:e.Moodle.core_course.util.section.getId(i.ancestor(M.course.format.get_section_wrapper(e),!0)),value:u},h=M.util.add_lightbox(e,i);h.show(),this.send_request(c,h,function(t){var n=i.all(r.ACTIVITYLI);n.each(function(n){var i;n.one(r.SHOW)?i=n.one(r.SHOW):i=n.one(r.HIDE);var s=e.Moodle.core_course.util.cm.getId(n);e.Array.indexOf(t.resourcestotoggle,""+s)!==-1&&M.course.resource_toolbox.handle_resource_dim(i,n,a)},this)})},toggle_highlight:function(t){t.preventDefault();var n=t.target.ancestor(M.course.format.get_section_selector(e)),i=t.target.ancestor("a",!0),s=i.one("img"),o=n.hasClass("current"),u=0,a=M.util.get_string("markthistopic","moodle");e.one(r.PAGECONTENT).all(M.course.format.get_section_selector(e)+".current "+r.HIGHLIGHT).set("title",a),e.one(r.PAGECONTENT).all(M.course.format.get_section_selector(e)+".current "+r.HIGHLIGHT+" img").set("alt",a).set("src",M.util.image_url("i/marker")),e.one(r.PAGECONTENT).all(M.course.format.get_section_selector(e)).removeClass("current");if(!o){n.addClass("current"),u=e.Moodle.core_course.util.section.getId(n.ancestor(M.course.format.get_section_wrapper(e),!0));var f=M.util.get_string("markedthistopic","moodle");i.set("title",f),s.set("alt",f).set("src",M.util.image_url("i/marked"))}var l={"class":"course",field:"marker",value:u},c=M.util.add_lightbox(e,n);c.show(),this.send_request(l,c)}},{NAME:"course-section-toolbox",ATTRS:{}}),M.course.init_section_toolbox=function(e){return new a(e)}},"@VERSION@",{requires:["node","base","event-key","node","io","moodle-course-coursebase","moodle-course-util"]});
