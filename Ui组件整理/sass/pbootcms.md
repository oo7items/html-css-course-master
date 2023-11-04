# 功能调用
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
## 顶级栏目大图调用
```
{pboot:sort scode="{sort:tcode}"}
    <div class="sort" style="background-image: url([sort:pic]);">
{pboot:sort scode="{sort:tcode}"}
```

