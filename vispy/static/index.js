define(["@jupyter-widgets/base"],function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e){e.exports={name:"vispy",version:"0.1.0",description:"A Custom Jupyter Widget Library for the VisPy Python Library",author:"Vispy Development Team",license:"BSD-3-Clause",main:"lib/index.js",repository:{type:"git",url:"https://github.com/VisPy/vispy.git"},keywords:["jupyter","widgets","ipython","ipywidgets"],files:["lib/**/*.js","dist/*.js"],scripts:{clean:"rimraf dist/",prepare:"webpack",test:'echo "Error: no test specified" && exit 1'},devDependencies:{rimraf:"^2.6.1",webpack:"^4.1.0","webpack-cli":"^2.0.10"},dependencies:{"@jupyter-widgets/base":"^1.1.8",lodash:"^4.17.5"}}},function(e,t,n){var r;e.exports=function e(t,n,i){function o(a,u){if(!n[a]){if(!t[a]){var l="function"==typeof r&&r;if(!u&&l)return r(a,!0);if(s)return s(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return o(n||e)},c,c.exports,e,t,n,i)}return n[a].exports}for(var s="function"==typeof r&&r,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(e,t,n){var r=(e("./lib/screenfull.min.js"),e("./vispycanvas.js")),i=e("./gloo.js"),o=e("./events.js");e("./util.js"),e("./data.js"),e("./lib/jquery.mousewheel.min.js")($);var s=function(){this.events=o,this.gloo=i,this._is_loop_running=!1,this._canvases=[]};s.prototype.init=function(e){var t;t=$(e);var n=new r(t);return n.deactivate_context_menu(),this.events.init(n),this.gloo.init(n),this.register(n),n},s.prototype.register=function(e){this._canvases.push(e)},s.prototype.unregister=function(e){var t=this._canvases.indexOf(e);t>-1&&this._canvases.splice(t,1)},s.prototype.start_event_loop=function(){if(!this._is_loop_running){window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};var e=this;!function t(){e._request_id=requestAnimFrame(t);try{for(var n=0;n<e._canvases.length;n++)e._canvases[n].event_tick()}catch(t){throw e.stop_event_loop(),t}}(),this._is_loop_running=!0,console.debug("Event loop started.")}},s.prototype.stop_event_loop=function(){window.cancelAnimationFrame(this._request_id),this._is_loop_running=!1,console.debug("Event loop stopped.")},t.exports=new s},{"./data.js":2,"./events.js":3,"./gloo.js":5,"./lib/jquery.mousewheel.min.js":6,"./lib/screenfull.min.js":7,"./util.js":8,"./vispycanvas.js":9}],2:[function(e,t,n){var r={float32:Float32Array,int8:Int8Array,int16:Int16Array,int32:Int32Array,uint8:Uint8Array,uint16:Uint16Array,uint32:Uint32Array};t.exports={to_array_buffer:function(e){var t=e.storage_type;if(void 0==t)return e;var n=e.data_type,i=e.buffer;if("javascript_array"==t)return r[n](i);if("javascript_typed_array"==t||"array_buffer"==t)return i;if("binary"==t)return i.buffer;if("base64"==t){var o=function(e){for(var t=window.atob(e),n=t.length,r=new Uint8Array(n),i=0;i<n;i++){var o=t.charCodeAt(i);r[i]=o}return r.buffer}(i);return o}}}},{}],3:[function(e,t,n){function r(e){var t=[];return e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),e.shiftKey&&t.push("shift"),t}function i(e){var t=function(e){return window.event?e.keyCode:e.which?e.which:void 0}(e),n=l[t];return void 0==n&&(n=function(e){return String.fromCharCode(e).toUpperCase().trim()}(t)),n}function o(e,t,n){if(e._eventinfo.is_button_pressed)var i=f[t.button];else i=null;var o=function(e,t){var n=e.getBoundingClientRect();return[t.clientX-n.left,t.clientY-n.top]}(e.$el.get(0),t),s=r(t),a=e._eventinfo.press_event,u=(e._eventinfo.last_event,{type:n,pos:o,button:i,is_dragging:null!=a,modifiers:s,delta:null,press_event:a,last_event:null});return u}function s(e,t,n){var o=r(t),s=(e._eventinfo.last_event,{type:n,modifiers:o,key_code:i(t),last_event:null});return s}function a(e){void 0==e&&(e=100),this._queue=[],this.maxlen=e}var u=e("./vispycanvas.js"),l={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CONTROL",18:"ALT",27:"ESCAPE",32:"SPACE",33:"PAGEUP",34:"PAGEDOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",45:"INSERT",46:"DELETE",91:"META",92:"META",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},f={0:1,2:2,1:3};u.prototype._mouse_press=function(e){},u.prototype._mouse_release=function(e){},u.prototype._mouse_move=function(e){},u.prototype._mouse_wheel=function(e){},u.prototype._mouse_click=function(e){},u.prototype._mouse_dblclick=function(e){},u.prototype._key_press=function(e){},u.prototype._key_release=function(e){},u.prototype._initialize=function(e){},u.prototype._resize=function(e){},u.prototype._paint=function(e){},u.prototype._event_tick=function(e){},u.prototype.on_mouse_press=function(e){this._mouse_press=e},u.prototype.on_mouse_release=function(e){this._mouse_release=e},u.prototype.on_mouse_move=function(e){this._mouse_move=e},u.prototype.on_mouse_wheel=function(e){this._mouse_wheel=e},u.prototype.on_mouse_dblclick=function(e){this._mouse_dblclick=e},u.prototype.on_key_press=function(e){this._key_press=e},u.prototype.on_key_release=function(e){this._key_release=e},u.prototype.on_initialize=function(e){this._initialize=e},u.prototype.on_resize=function(e){this._resize=e},u.prototype.on_paint=function(e){this._paint=e},u.prototype.on_event_tick=function(e){this._event_tick=e},u.prototype.initialize=function(){var e={type:"initialize"};this._set_size(),this._initialize(e)},u.prototype._set_size=function(e){return void 0==e&&(e=[this.$el.width(),this.$el.height()]),this.size=e,this.width=e[0],this.height=e[1],e},u.prototype.paint=function(){var e={type:"paint"};this.event_queue.append(e)},u.prototype.update=u.prototype.paint,u.prototype.resize=function(e){var t=function(e,t){return{type:"resize",size:t}}(0,e=this._set_size(e));this.gl.canvas.width=e[0],this.gl.canvas.height=e[1],this.event_queue.append(t),this._resize(t)},u.prototype.event_tick=function(){this._event_tick();var e=this.execute_pending_commands();if(e>0){var t={type:"paint"};this._paint(t)}},u.prototype.is_fullscreen=function(){return screenfull.enabled&screenfull.isFullscreen},u.prototype.toggle_fullscreen=function(){screenfull.enabled&&(screenfull.isFullscreen?(screenfull.exit(),this.resize(this._size)):(this.$el.width("100%").height("100%"),this._size=[this.$el.width(),this.$el.height()],screenfull.request(this.$el[0]),this.resize([screen.width,screen.height])))},u.prototype.deactivate_context_menu=function(){document.oncontextmenu=function(){return!1}},u.prototype.resizable=function(){var e=this;this.$el.resizable({resize:function(t,n){e.resize([n.size.width,n.size.height])}})},a.prototype.clear=function(){this._queue=[]},a.prototype.append=function(e,t){var n=!0;if(void 0==t&&(t=!0),t){var r=this._queue[this._queue.length-1];if(void 0!=r){var i=function(e,t){var n=e.type;return n==t.type&&"mouse_move"==n&&e.button==t.button&e.is_dragging==t.is_dragging&e.modifiers.equals(t.modifiers)?["pos"]:[]}(e,r);if(i.length>0){for(var o=0;o<i.length;o++){var s=i[o];this._queue[this._queue.length-1][s]=e[s]}n=!1}}}n&&this._queue.push(e),this._queue.length>this.maxlen&&(this._queue.shift(),this._queue[0].last_event=null)},a.prototype.get=function(){return this._queue},Object.defineProperty(a.prototype,"length",{get:function(){return this._queue.length}});var c=function(){};c.prototype.init=function(e){!function(e){e.$el.resize(function(t){e.resize([t.width(),t.height()])}),e.event_queue=new a,e._eventinfo={type:null,pos:null,button:null,is_dragging:null,key:null,modifiers:[],press_event:null,last_event:null,delta:null},e._eventinfo.is_button_pressed=0,e.$el.mousemove(function(t){var n=o(e,t,"mouse_move");e._mouse_move(n),e.event_queue.append(n)}),e.$el.mousedown(function(t){++e._eventinfo.is_button_pressed;var n=o(e,t,"mouse_press");e._mouse_press(n),e._eventinfo.press_event=n,e.event_queue.append(n)}),e.$el.mouseup(function(t){--e._eventinfo.is_button_pressed;var n=o(e,t,"mouse_release");e._mouse_release(n),e._eventinfo.press_event=null,e.event_queue.append(n)}),e.$el.click(function(t){e._eventinfo.press_event=null}),e.$el.dblclick(function(t){e._eventinfo.press_event=null}),void 0!=e.$el.mousewheel&&e.$el.mousewheel(function(t){var n=o(e,t,"mouse_wheel");n.delta=[t.deltaX*t.deltaFactor*.01,t.deltaY*t.deltaFactor*.01],e._mouse_wheel(n),e.event_queue.append(n),t.preventDefault(),t.stopPropagation()}),e.$el.keydown(function(t){var n=s(e,t,"key_press");e._key_press(n),e.event_queue.append(n)}),e.$el.keyup(function(t){var n=s(e,t,"key_release");e._key_release(n),e.event_queue.append(n)}),e.$el.mouseout(function(e){})}(e)},t.exports=new c},{"./vispycanvas.js":9}],4:[function(e,t,n){function r(e,t,n){n=n.replace(/\\n/g,"\n");var r=e.gl.createShader(e.gl[t]);return e.gl.shaderSource(r,n),e.gl.compileShader(r),e.gl.getShaderParameter(r,e.gl.COMPILE_STATUS)?r:(console.error(e.gl.getShaderInfoLog(r)),null)}function i(e,t,n,r,i,o){var s=function(e){return w[e]}(r),a=s[0],u=s[1];_vbo_info=e._ns[n];var l=_vbo_info.handle;e.gl.enableVertexAttribArray(t),e.gl.bindBuffer(e.gl.ARRAY_BUFFER,l),e.gl.vertexAttribPointer(t,u,e.gl[a],!1,i,o)}function o(e,t){e.gl.disableVertexAttribArray(t)}function s(e,t,n,r){t!==E&&(e.gl.activeTexture(e.gl.TEXTURE0+r),e.gl.bindTexture(e.gl.TEXTURE_2D,t))}function a(e,t,n,r){e.gl.activeTexture(e.gl.TEXTURE0+r),e.gl.bindTexture(e.gl.TEXTURE_2D,null)}function u(e,t,n,r,i,o,s,a,u,l){if(e.gl.bindTexture(n,t),e.gl.pixelStorei(e.gl.UNPACK_ALIGNMENT,1),null===s)e.gl.texImage2D(n,0,r,i,o,0,r,e.gl.UNSIGNED_BYTE,s);else if(s.getContext)e.gl.texImage2D(n,0,e.gl.RGBA,e.gl.RGBA,e.gl.UNSIGNED_BYTE,s);else if(s.canvas)e.gl.texImage2D(n,0,e.gl.RGBA,e.gl.RGBA,e.gl.UNSIGNED_BYTE,s.canvas);else{var f;if(f=l==e.gl.FLOAT?new Float32Array(s):new Uint8Array(s),a&&u&&(u[0]!==o||u[1]!==i)){var i=u[u.length-2]*u[u.length-1],c=function(e){for(var t=[8,4,2,1],n=0;n<t.length;n++)if(e%t[n]==0)return t[n]}(i);e.gl.pixelStorei(e.gl.UNPACK_ALIGNMENT,c),e.gl.texSubImage2D(n,0,a[1],a[0],u[1],u[0],r,l,f)}else e.gl.pixelStorei(e.gl.UNPACK_ALIGNMENT,1),e.gl.texImage2D(n,0,r,i,o,0,r,l,f)}}function l(e,t,n,r,i,o){e.gl.bindBuffer(n,t),o?e.gl.bufferSubData(n,r,i):e.gl.bufferData(n,i,e.gl.STATIC_DRAW)}function f(e){return T[e]}function c(e,t){for(var n=t.split("|"),r=0,i=0;i<n.length;i++){var o=n[i].toUpperCase().trim();r|=e.gl[o]}return r}function p(e,t){var n=e._ns[t],r=e.env.fb_stack;return 0==r.length&&r.push(null),r[r.length-1]===n.handle?void y("Frame buffer already active {0}".format(t)):(y("Binding frame buffer {0}.".format(t)),e.gl.bindFramebuffer(e.gl.FRAMEBUFFER,n.handle),void r.push(n.handle))}function g(e,t){var n=e._ns[t],r=e.env.fb_stack;for(0==r.length&&r.push(null);r[r.length-1]===n.handle;)r.pop();y("Binding previous frame buffer"),e.gl.bindFramebuffer(e.gl.FRAMEBUFFER,r[r.length-1])}function _(e){e.env={fb_stack:[]}}function d(){this._queue=[]}var h=e("./vispycanvas.js"),m=e("./util.js"),v=e("./data.js"),y=m.debug,b=v.to_array_buffer,E="JUST_DELETED",x={float32:"FLOAT",uint8:"UNSIGNED_BYTE"},w={float:["FLOAT",1],vec2:["FLOAT",2],vec3:["FLOAT",3],vec4:["FLOAT",4],int:["INT",1],ivec2:["INT",2],ivec3:["INT",3],ivec4:["INT",4]},F={float:"uniform1fv",vec2:"uniform2fv",vec3:"uniform3fv",vec4:"uniform4fv",int:"uniform1iv",ivec2:"uniform2iv",ivec3:"uniform3iv",ivec4:"uniform4iv",mat2:"uniformMatrix2fv",mat3:"uniformMatrix3fv",mat4:"uniformMatrix4fv"},T={VertexBuffer:"ARRAY_BUFFER",IndexBuffer:"ELEMENT_ARRAY_BUFFER",Texture2D:"TEXTURE_2D"},R={color:["COLOR_ATTACHMENT0","RGBA4"],depth:["DEPTH_ATTACHMENT","DEPTH_COMPONENT16"],stencil:["STENCIL_ATTACHMENT","STENCIL_INDEX8"]};d.prototype.clear=function(){this._queue=[]},d.prototype.append=function(e){this._queue.push(e)},d.prototype.append_multi=function(e){for(var t=0;t<e.length;t++)this._queue.push(e[t])},d.prototype.get=function(){return this._queue},Object.defineProperty(d.prototype,"length",{get:function(){return this._queue.length}}),h.prototype.set_deferred=function(e){this._deferred=e},h.prototype.execute_pending_commands=function(){var e=this.glir_queue.get(),t=-1;if(0==e.length)return 0;for(var n=0;n<e.length;n++)if("SWAP"===e[n][0]){t=n;break}for(n=0;n<=t;n++)this.command(e[n],!1);return t>=0&&(y("Processed {0} events.".format(t+1)),this.glir_queue._queue=this.glir_queue._queue.slice(t+1)),t+1},h.prototype.command=function(e,t){void 0===t&&(t=this._deferred);var n=e[0].toLowerCase();t?this.glir_queue.append(e):this.glir[n](this,e.slice(1))};var A=function(){};A.prototype.init=function(e){e._ns={},e._deferred=!0,_(e),e.glir_queue=new d,e.glir=this},A.prototype.current=function(e,t){_(e),e.gl.bindFramebuffer(e.gl.FRAMEBUFFER,null)},A.prototype.swap=function(e,t){},A.prototype.create=function(e,t){var n=t[0],r=t[1];"VertexBuffer"==r?(y("Creating vertex buffer '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createBuffer(),size:0}):"IndexBuffer"==r?(y("Creating index buffer '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createBuffer(),size:0}):"FrameBuffer"==r?(y("Creating frame buffer '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createFramebuffer(),size:0,validated:!1}):"RenderBuffer"==r?(y("Creating render buffer '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createRenderbuffer(),size:0}):"Texture2D"==r?(y("Creating texture '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createTexture(),size:0,shape:[]}):"Program"==r&&(y("Creating program '{0}'.".format(n)),e._ns[n]={object_type:r,handle:e.gl.createProgram(),attributes:{},uniforms:{},textures:{},texture_uniforms:{}})},A.prototype.delete=function(e,t){var n=t[0],r=e._ns[n].object_type,i=e._ns[n].handle;e._ns[n].handle=E,"VertexBuffer"==r?(y("Deleting vertex buffer '{0}'.".format(n)),e.gl.deleteBuffer(i)):"IndexBuffer"==r?(y("Deleting index buffer '{0}'.".format(n)),e.gl.deleteBuffer(i)):"FrameBuffer"==r?(y("Deleting frame buffer '{0}'.".format(n)),e.gl.deleteFramebuffer(i)):"RenderBuffer"==r?(y("Deleting render buffer '{0}'.".format(n)),e.gl.deleteRenderbuffer(i)):"Texture2D"==r?(y("Deleting texture '{0}'.".format(n)),e.gl.deleteTexture(i)):"Program"==r&&(y("Deleting program '{0}'.".format(n)),e.gl.deleteProgram(i))},A.prototype.shaders=function(e,t){var n=t[0],i=t[1],o=t[2],s=e._ns[n].handle;y("Compiling shaders for program '{0}'.".format(n));var a=r(e,"VERTEX_SHADER",i),u=r(e,"FRAGMENT_SHADER",o);y("Attaching shaders for program '{0}'".format(n)),function(e,t,n,r){e.gl.attachShader(t,n),e.gl.attachShader(t,r),e.gl.linkProgram(t),e.gl.getProgramParameter(t,e.gl.LINK_STATUS)||console.warn("Could not initialise shaders on program '{0}'.".format(t))}(e,s,a,u)},A.prototype.size=function(e,t){var n=t[0],r=t[1],i=t[2],o=e._ns[n],s=o.handle,a=o.object_type,u=e.gl[f(a)];a.indexOf("Texture")>=0?(o.format=i.toUpperCase(),y("Setting texture size to {1} for '{0}'.".format(n,r))):"RenderBuffer"==a?(e.gl.bindRenderbuffer(e.gl.RENDERBUFFER,s),o.format=e.gl[function(e){return R[e][1]}(i)],e.gl.renderbufferStorage(e.gl.RENDERBUFFER,o.format,r[1],r[0]),e.gl.bindRenderbuffer(e.gl.RENDERBUFFER,null)):(y("Setting buffer size to {1} for '{0}'.".format(n,r)),l(e,s,u,0,r,!1)),o.size=r},A.prototype.data=function(e,t){var n=t[0],r=t[1],i=t[2],o=e._ns[n],s=o.object_type,a=o.handle,c=e.gl[f(s)],p=b(i);if(s.indexOf("Texture")>=0){var g=o.size,_=g[0],d=g[1],h=e.gl[o.format];y("Setting texture data for '{0}'.".format(n));var m=e.gl[function(e){return x[e]}(i.dtype)];u(e,a,c,h,d,_,p,r,i.shape,m),o.shape=g}else y("Setting buffer data for '{0}'.".format(n)),l(e,a,c,r,p,o.size>0),o.size=p.byteLength},A.prototype.attribute=function(e,t){var n=t[0],r=t[1],i=t[2],o=t[3][0],s=t[3][1],a=t[3][2],u=e._ns[n].handle;y("Creating attribute '{0}' for program '{1}'.".format(r,n));var l=function(e,t,n){return e.gl.getAttribLocation(t,n)}(e,u,r);e._ns[n].attributes[r]={handle:l,type:i,vbo_id:o,stride:s,offset:a}},A.prototype.uniform=function(e,t){var n=t[0],r=t[1],i=t[2],o=t[3],s=e._ns[n].handle;if(e.gl.useProgram(s),void 0==e._ns[n].uniforms[r]){y("Creating uniform '{0}' for program '{1}'.".format(r,n));var a=e.gl.getUniformLocation(s,r),u=function(e){return F[e]}(i);e._ns[n].uniforms[r]=[a,u]}y("Setting uniform '{0}' to '{1}' with {2} elements.".format(r,o,o.length));var l=e._ns[n].uniforms[r],a=l[0],u=l[1];!function(e,t,n,r){array=b(r),n.indexOf("Matrix")>0?e.gl[n](t,!1,array):e.gl[n](t,array)}(e,a,u,o)},A.prototype.texture=function(e,t){var n=t[0],r=t[1],i=t[2],o=e._ns[n],s=o.handle,a=e._ns[i].handle;if(a===E)return y("Removing texture '{0}' from program '{1}'".format(i,n)),void delete o.textures[i];y("Initializing texture '{0}' for program '{1}'.".format(i,n)),o.texture_uniforms.hasOwnProperty(r)&&(y("Removing previously assigned texture for '{0}'".format(r)),delete o.textures[o.texture_uniforms[r]]);var u=e.gl.getUniformLocation(s,r);o.texture_uniforms[r]=i,e._ns[n].textures[i]={sampler_name:r,sampler_handle:u,number:-1,handle:a}},A.prototype.interpolation=function(e,t){var n=t[0],r=t[1].toUpperCase(),i=t[2].toUpperCase(),o=e._ns[n].handle,s=e.gl.TEXTURE_2D;e.gl.bindTexture(s,o),e.gl.texParameteri(s,e.gl.TEXTURE_MIN_FILTER,e.gl[r]),e.gl.texParameteri(s,e.gl.TEXTURE_MAG_FILTER,e.gl[i]),e.gl.bindTexture(s,null)},A.prototype.wrapping=function(e,t){var n=t[0],r=t[1],i=e._ns[n].handle,o=e.gl.TEXTURE_2D;e.gl.bindTexture(o,i),e.gl.texParameteri(o,e.gl.TEXTURE_WRAP_S,e.gl[r[0].toUpperCase()]),e.gl.texParameteri(o,e.gl.TEXTURE_WRAP_T,e.gl[r[1].toUpperCase()]),e.gl.bindTexture(o,null)},A.prototype.draw=function(e,t){var n=t[0],r=t[1].toUpperCase(),u=t[2],l=e._ns[n].handle,f=e._ns[n].attributes,c=e._ns[n].textures,p=0;for(attribute_name in e.gl.useProgram(l),f){var g=f[attribute_name];y("Activating attribute '{0}' for program '{1}'.".format(attribute_name,n)),i(e,g.handle,g.vbo_id,g.type,g.stride,g.offset)}for(texture_id in c){var _=c[texture_id];e._ns[texture_id].handle!==E?(_.number=p,p+=1,y("Activating texture '{0}' for program '{1}' as number '{2}'.".format(texture_id,n,_.number)),s(e,_.handle,_.sampler_handle,_.number),e.gl.uniform1i(_.sampler_handle,_.number)):(y("Ignoring texture '{0}' from program '{1}'".format(texture_id,n)),_.handle=E)}if(2==u.length){var d=u[0],h=u[1];y("Rendering program '{0}' with {1}.".format(n,r)),e.gl.drawArrays(e.gl[r],d,h)}else if(3==u.length){var m=u[0],v=u[1],h=u[2],b=e._ns[m].handle;y("Rendering program '{0}' with {1} and index buffer '{2}' of type '{3}'.".format(n,r,m,v)),e.gl.bindBuffer(e.gl.ELEMENT_ARRAY_BUFFER,b),e.gl.drawElements(e.gl[r],h,e.gl[v],0)}for(attribute_name in f)y("Deactivating attribute '{0}' for program '{1}'.".format(attribute_name,n)),o(e,f[attribute_name].handle);var x={};for(texture_id in c){var _=c[texture_id];y("Deactivating texture '{0}' for program '{1}'.".format(texture_id,n)),a(e,_.handle,_.sampler_handle,_.number),e._ns[texture_id].handle!=E&&(x[texture_id]=_)}e._ns[n].textures=x},A.prototype.attach=function(e,t){var n,r=t[0],i=e.gl[function(e){return R[e][0]}(t[1])],o=t[2];p(e,r),0==o?(y("Attaching RenderBuffer object {0} to framebuffer {1}".format(o,r)),e.gl.framebufferRenderbuffer(e.gl.FRAMEBUFFER,i,e.gl.RENDERBUFFER,null)):(n=e._ns[o],y("Attaching {0} object {1} to framebuffer {2} for {3}".format(n.object_type,o,r,t[1])),"RenderBuffer"==n.object_type?(e.gl.bindRenderbuffer(e.gl.RENDERBUFFER,n.handle),e.gl.framebufferRenderbuffer(e.gl.FRAMEBUFFER,i,e.gl.RENDERBUFFER,n.handle),e.gl.bindRenderbuffer(e.gl.RENDERBUFFER,null)):"Texture2D"==n.object_type&&(0==n.shape.length&&(y("Setting empty texture data to unset texture before attaching to framebuffer"),u(e,n.handle,e.gl.TEXTURE_2D,e.gl[n.format],n.size[1],n.size[0],null)),e.gl.bindTexture(e.gl.TEXTURE_2D,n.handle),e.gl.framebufferTexture2D(e.gl.FRAMEBUFFER,i,e.gl.TEXTURE_2D,n.handle,0),e.gl.bindTexture(e.gl.TEXTURE_2D,null))),e._ns[r].validated=!1,g(e,r)},A.prototype.framebuffer=function(e,t){var n=t[0],r=t[1],i=e._ns[n];r?(y("Binding framebuffer {0}".format(n)),p(e,n),i.validated||(i.validated=!0,function(e){var t=e.gl.checkFramebufferStatus(e.gl.FRAMEBUFFER);if(t!=e.gl.FRAMEBUFFER_COMPLETE)throw t==e.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT?"FrameBuffer attachments are incomplete.":t==e.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT?"No valid attachments in the FrameBuffer.":t==e.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS?"attachments do not have the same width and height.":t==e.gl.FRAMEBUFFER_UNSUPPORTED?"Combination of internal formats used by attachments is not supported.":"Unknown framebuffer error"+t}(e))):(y("Unbinding framebuffer {0}".format(n)),g(e,n))},A.prototype.func=function(e,t){var n=t[0];y("Calling {0}({1}).".format(n,t.slice(1)));for(var r=1;r<t.length;r++)"string"==typeof t[r]&&(t[r]=c(e,t[r]));var i=e.gl[n],o=t.slice(1);i.apply(e.gl,o)},t.exports=new A},{"./data.js":2,"./util.js":8,"./vispycanvas.js":9}],5:[function(e,t,n){var r=e("./gloo.glir.js"),i=function(){this.glir=r};i.prototype.init=function(e){(function(e){var t=e.$el.get(0);e.gl=t.getContext("webgl")||t.getContext("experimental-webgl"),null===(e.gl.getExtension("OES_standard_derivatives")||e.gl.getExtension("MOZ_OES_standard_derivatives")||e.gl.getExtension("WEBKIT_OES_standard_derivatives"))&&console.warn("Extension 'OES_standard_derivatives' is not supported in this browser. Some features may not work as expected"),null===(e.gl.getExtension("OES_element_index_uint")||e.gl.getExtension("MOZ_OES_element_index_uint")||e.gl.getExtension("WEBKIT_OES_element_index_uint"))&&console.warn("Extension 'OES_element_index_uint' is not supported in this browser. Some features may not work as expected"),null===e.gl.getExtension("OES_texture_float")&&console.warn("Extension 'OES_texture_float' is not supported in this browser. Some features may not work as expected"),null===e.gl.getExtension("OES_texture_float_linear")&&console.warn("Extension 'OES_texture_float_linear' is not supported in this browser. Some features may not work as expected")})(e),this.glir.init(e)},t.exports=new i},{"./gloo.glir.js":4}],6:[function(e,t,n){!function(e){"object"==typeof n?t.exports=e:e(jQuery)}(function(e){function t(t){var s=t||window.event,a=u.call(arguments,1),l=0,c=0,p=0,g=0,_=0,d=0;if((t=e.event.fix(s)).type="mousewheel","detail"in s&&(p=-1*s.detail),"wheelDelta"in s&&(p=s.wheelDelta),"wheelDeltaY"in s&&(p=s.wheelDeltaY),"wheelDeltaX"in s&&(c=-1*s.wheelDeltaX),"axis"in s&&s.axis===s.HORIZONTAL_AXIS&&(c=-1*p,p=0),l=0===p?c:p,"deltaY"in s&&(p=-1*s.deltaY,l=p),"deltaX"in s&&(c=s.deltaX,0===p&&(l=-1*c)),0!==p||0!==c){if(1===s.deltaMode){var h=e.data(this,"mousewheel-line-height");l*=h,p*=h,c*=h}else if(2===s.deltaMode){var m=e.data(this,"mousewheel-page-height");l*=m,p*=m,c*=m}if(g=Math.max(Math.abs(p),Math.abs(c)),(!o||o>g)&&(o=g,r(s,g)&&(o/=40)),r(s,g)&&(l/=40,c/=40,p/=40),l=Math[l>=1?"floor":"ceil"](l/o),c=Math[c>=1?"floor":"ceil"](c/o),p=Math[p>=1?"floor":"ceil"](p/o),f.settings.normalizeOffset&&this.getBoundingClientRect){var v=this.getBoundingClientRect();_=t.clientX-v.left,d=t.clientY-v.top}return t.deltaX=c,t.deltaY=p,t.deltaFactor=o,t.offsetX=_,t.offsetY=d,t.deltaMode=0,a.unshift(t,l,c,p),i&&clearTimeout(i),i=setTimeout(n,200),(e.event.dispatch||e.event.handle).apply(this,a)}}function n(){o=null}function r(e,t){return f.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}var i,o,s=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],a="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],u=Array.prototype.slice;if(e.event.fixHooks)for(var l=s.length;l;)e.event.fixHooks[s[--l]]=e.event.mouseHooks;var f=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var n=a.length;n;)this.addEventListener(a[--n],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",f.getLineHeight(this)),e.data(this,"mousewheel-page-height",f.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var n=a.length;n;)this.removeEventListener(a[--n],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var n=e(t),r=n["offsetParent"in e.fn?"offsetParent":"parent"]();return r.length||(r=e("body")),parseInt(r.css("fontSize"),10)||parseInt(n.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})})},{}],7:[function(e,t,n){!function(){"use strict";var e=void 0!==t&&t.exports,n="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,r=function(){for(var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,i=n.length,o={};i>r;r++)if((e=n[r])&&e[1]in document){for(r=0,t=e.length;t>r;r++)o[n[0][r]]=e[r];return o}return!1}(),i={request:function(e){var t=r.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[t]():e[t](n&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[r.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},onchange:function(){},onerror:function(){},raw:r};r?(Object.defineProperties(i,{isFullscreen:{get:function(){return!!document[r.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[r.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[r.fullscreenEnabled]}}}),document.addEventListener(r.fullscreenchange,function(e){i.onchange.call(i,e)}),document.addEventListener(r.fullscreenerror,function(e){i.onerror.call(i,e)}),e?t.exports=i:window.screenfull=i):e?t.exports=!1:window.screenfull=!1}()},{}],8:[function(e,t,n){String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return void 0!==e[n]?e[n]:t})}),void 0===String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s+|\s+$/g,"")}),Array.prototype.equals=function(e){if(!e)return!1;if(this.length!=e.length)return!1;for(var t=0,n=this.length;t<n;t++)if(this[t]instanceof Array&&e[t]instanceof Array){if(!this[t].equals(e[t]))return!1}else if(this[t]!=e[t])return!1;return!0},"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(e){return this.slice(0,e.length)==e}),window.VISPY_DEBUG=!1,t.exports={debug:function(e){window.VISPY_DEBUG&&console.debug(e)}}},{}],9:[function(e,t,n){t.exports=function(e){this.$el=e}},{}]},{},[1])(1)},function(t,n){t.exports=e},function(e,t,n){"use strict";var r=n(2),i=n(1);var o=r.DOMWidgetView.extend({initialize:function(e){o.__super__.initialize.apply(this,[e]),this.model.on("msg:custom",this.on_msg,this),this.model.on("change:width",this.size_changed,this),this.model.on("change:height",this.size_changed,this)},render:function(){var e=this,t=$("<canvas></canvas>");t.css("background-color","#000"),t.attr("tabindex","1"),this.$el.append(t),this.$canvas=t,this.c=i.init(t),this.c.on_resize(function(t){e.model.set("width",t.size[0]),e.model.set("height",t.size[1]),e.touch()}),this.c.on_event_tick(function(){var t=e.c.event_queue.get();if(e.c.event_queue.clear(),t.length>0){var n={msg_type:"events",contents:t};e.send(n)}}),i.start_event_loop();this.send({msg_type:"init"}),this.size_changed(),this.c.resize(),this.c.resizable()},on_msg:function(e,t){if(void 0!=e&&"glir_commands"==e.msg_type){var n=e.commands;if("base64"==e.array_serialization)var r=e.buffers;else if("binary"==e.array_serialization){r=[];for(var i=0;i<t.length;i++)r[i]={storage_type:"binary",buffer:t[i]}}var o=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];if("DATA"==r[0]){var i=r[3].buffer_index,o=r[3].buffer_shape,s=r[3].buffer_dtype;r[3]=t[i],r[3].shape=o,r[3].dtype=s}}return e}(n,r);for(i=0;i<o.length;i++){var s=n[i];this.c.command(s)}}},size_changed:function(){var e=[this.model.get("width"),this.model.get("height")];this.$canvas.css("width",e[0]+"px"),this.$canvas.css("height",e[1]+"px")},remove:function(){i.unregister(this.c),this.send({msg_type:"status",contents:"removed"})}});e.exports={VispyView:o}},function(e,t,n){n.p=document.querySelector("body").getAttribute("data-base-url")+"nbextensions/vispy/",e.exports.VispyView=n(3).VispyView,e.exports.version=n(0).version}])});
//# sourceMappingURL=index.js.map