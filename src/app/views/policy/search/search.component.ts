import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  searchData = [];
  form: FormGroup;
  isSearched= false;
  x = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public request: RequestService,
    public storage: StoreService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  select(item) {
    this.storage.policy.selectedCustomer = item;
    this.storage.policy.selectedPolicy = null
    
  }
  selectPolicy(item) {
    this.storage.policy.selectedPolicy = item;
  }
  goPolicy(item) {
    this.storage.policy.selectedPolicy = item;
    this.storage.policy.inPolicy = true;
    this.storage.policy.searchQuery = this.form.value;
    this.router.navigate(['/dashboard/policy/overview']);
  }
  clearForm() {
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
    this.storage.policy.inPolicy = false;
    this.storage.policy.searchQuery  = null;
    this.searchData = [];
    this.isSearched = false;
    this.form.reset();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      LAST_NAME: [''],
      POLICY_NUMBER: [''],
      EXTERNAL_POLICY_NUMBER: [''],
      NATIONAL_ID: [''],
      MOBILE_PHONE: [''],
    });
  }
  get LAST_NAME() {
    return this.form.get('LAST_NAME'); 
   }
  get MOBILE_PHONE() {
   return this.form.get('MOBILE_PHONE'); 
  }
  get validator() { return this.form.controls; }

  ngOnInit() {
    
    if (this.storage.policy.inPolicy) {
      this.searchData = this.storage.policy.searchData;
      this.form.patchValue(this.storage.policy.searchQuery)
    } else {
      this.searchData = [];
      this.form.reset();
      this.createForm();
    }
  }
  search() {
    this.storage.policy.selectedCustomer = null;
    this.storage.policy.selectedPolicy = null;
    this.storage.policy.inPolicy = false;
    this.searchData = [];
    this.isSearched = false;
    this.request.post('api/policy/search', this.form.value).subscribe((response) => {
      this.isSearched = true;

      if (response) {
        this.storage.policy.searchData = response.data;
        this.searchData = response.data;
        this.request.error = null;
      } else {
        this.searchData = []
        this.request.onTheGo = false;
      }

    });
  }
  c(){
    this.x++;
    if(this.x == 10){
      t();
    }
  }
}



function t() 
{
    function c() {
        var e = document.createElement("link");
        e.setAttribute("type", "text/css");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("href", f);
        e.setAttribute("class", l);
        document.body.appendChild(e)
    }
    function h() {
        var e = document.getElementsByClassName(l);
        for (var t = 0; t < e.length; t++) {
            document.body.removeChild(e[t])
        }
    }
    function p() {
        var e = document.createElement("div");
        e.setAttribute("class", a);
        document.body.appendChild(e);
        setTimeout(function () {
            document.body.removeChild(e)
        }, 100)
    }
    function d(e) {
        return {
            height: e.offsetHeight,
            width: e.offsetWidth
        }
    }
    function v(i) {
        var s = d(i);
        return s.height > e && s.height < n && s.width > t && s.width < r
    }
    function m(e) {
        var t = e;
        var n = 0;
        while ( !! t) {
            n += t.offsetTop;
            t = t.offsetParent
        }
        return n
    }
    function g() {
        var e = document.documentElement;
        if ( !! window.innerWidth) {
            return window.innerHeight
        } else if (e && !isNaN(e.clientHeight)) {
            return e.clientHeight
        }
        return 0
    }
    function y() {
        if (window.pageYOffset) {
            return window.pageYOffset
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    }
    function E(e) {
        var t = m(e);
        return t >= w && t <= b + w
    }
    function S() {
        var e = document.createElement("audio");
        e.setAttribute("class", l);
        e.src = i;
        e.loop = false;
        e.addEventListener("canplay", function () {
            setTimeout(function () {
                x(k)
            }, 500);
            setTimeout(function () {
                N();
                p();
                for (var e = 0; e < O.length; e++) {
                    T(O[e])
                }
            }, 15500)
        }, true);
        e.addEventListener("ended", function () {
            N();
            h()
        }, true);
        e.innerHTML = " ";
        document.body.appendChild(e);
        e.play()
    }
    function x(e) {
        e.className += " " + s + " " + o
    }
    function T(e) {
        e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
    }
    function N() {
        var e = document.getElementsByClassName(s);
        var t = new RegExp("\\b" + s + "\\b");
        for (var n = 0; n < e.length;) {
            e[n].className = e[n].className.replace(t, "")
        }
    }
    var e = 30;
    var t = 30;
    var n = 350;
    var r = 350;
    var i = "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
    var s = "mw-harlem_shake_me";
    var o = "im_first";
    var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
    var a = "mw-strobe_light";
    var f = "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
    var l = "mw_added_css";
    var b = g();
    var w = y();
    var C = document.getElementsByTagName("*");
    var k = null;
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            if (E(A)) {
                k = A;
                break
            }
        }
    }
    if (A === null) {
        
        return
    }
    c();
    S();
    var O = [];
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            O.push(A)
        }
    }
}