# 功能调用
## head标签内容调用
<title>{pboot:pagetitle}</title>
<meta name="keywords" content="{pboot:pagekeywords}" />
<meta name="description" content="{pboot:pagedescription}" />
<link rel="icon" href="{pboot:sitelogo}" type="image/x-icon">

## 标签切换功能调用
<div class="operations">
          <ul class="operations__tabs">
            {pboot:nav scode="9"} {pboot:2nav parent=[nav:scode]}
            <button data-tab="[2nav:scode]" class="operations__tab {pboot:if([2nav:n] == 0)}operations__tab--active{/pboot:if}">[2nav:name]</button>
            {/pboot:2nav}
          </ul>
          {pboot:2nav parent=[nav:scode]}
          <div class="operations__content {pboot:if([2nav:n] == 0)}operations__content--active{/pboot:if} operations__content--[2nav:scode]">
            <div class="operations-nested operations-nested--grid">
              <div>
                {pboot:list scode='[2nav:scode]' num='4'}
                <div class="operations-nested__content operations-nested__content--[list:id] {pboot:if([list:n]==0)}operations-nested__content--active{/pboot:if}">
                  <img class="w-100" src="[list:ico]" alt="" />
                  <a href="[list:link]" class="title">[list:title]</a>
                  <div class="text">[list:content]</div>
                </div>
                {/pboot:list}
              </div>
              <ul class="operations-nested__tabs">
                {pboot:list scode='[2nav:scode]' num='4'}
                <div data-tab="[list:id]" class="operations-nested__tab {pboot:if([list:n]==0)}operations-nested__tab--active{/pboot:if} d-flex align-items-center gap-col-1">
                  <div>
                    <div class="year">[list:date style=d]</div>
                    <div class="day">[list:date style=y-m]</div>
                  </div>
                  <div class="divider"></div>
                  <div>
                    <div class="title">[list:title]</div>
                    <div class="p">[list:content]</div>
                  </div>
                </div>
                {/pboot:list}
              </ul>
            </div>
          </div>
          {/pboot:2nav} {/pboot:nav}
        </div>

## 指定栏目子栏目调用
 {pboot:nav scode="5" }
          {pboot:2nav parent=[nav:scode] num="4"}
          <a class="search__link" href="[2nav:link]">[2nav:name]</a>
          {/pboot:2nav}
          {/pboot:nav}

## 栏目banner调用
{pboot:sort scode="{sort:tcode}"}
<div class="sort">
    <img src="[sort:pic]" alt="">
    <div class="sort__content">
        <div class="sort__name">
            {sort:name}
        </div>
        <div class="sort__subname">
            {sort:subname}
        </div>
    </div>
</div>
{/pboot:sort}

## 导航栏判断是否有子菜单
 {pboot:nav}
          {pboot:if('[nav:soncount]'>0)}
          <li data-dropdown-type="mouseover" class="main-nav__item dropdown   {pboot:2if('[nav:scode]'=='{sort:tcode}')}main-nav__item--active{/pboot:2if}">
            <a href="###" class="main-nav__link dropdown__toggle"> [nav:name] </a>
            <div class="main-nav__arrow"></div>
            <ul class="dropdown__menu">
              {pboot:2nav parent=[nav:scode]}
                <a href="[2nav:link]" class="dropdown__link" id="tab1">[2nav:name]</a>
                {/pboot:2nav}
            </ul>
          </li>
          {else}
          <li class="main-nav__item   {pboot:2if('[nav:scode]'=='{sort:tcode}')}main-nav__item--active{/pboot:2if}">
            <a href="[nav:link]" class="main-nav__link"> [nav:name] </a>
            <div class="main-nav__arrow"></div>
          </li>
          {/pboot:if}
