---
title: Dashboard
layout: dashboard
permalink: /dashboard/
---
<h1>Overall Reporting Status</h1>

<h2> Status by Goal</h2>
  <ul class="usa-accordion-bordered">
{% for item in site.data.dashboard.goals %}
{% assign todos = 0 %}
{% assign doings = 0 %}
{% assign dones = 0 %}
{% assign items = 0 %}

{% assign issues_total = 0 %}
{% assign todos_percent = 0 %}
{% assign doings_percent = 0 %}
{% assign dones_percent = 0 %}

    {% for indicator in site.indicators %}
        {% if indicator.goal == item.goal %}
            {% for dataset in indicator.datasets %}
                {% assign datasets = datasets | plus:1 %}
                {% assign todos = todos | plus:dataset.todo %}
                {% assign doings = doings | plus:dataset.doing %}
                {% assign dones = dones | plus:dataset.done %}
            {% endfor %}
        {% endif %}
    {% endfor %}

    {% assign issues_total = todos | plus:doings | plus:dones | round: 1 %}

    {% assign todos_percent = todos | divided_by:issues_total | times:100 %}
    {% assign doings_percent = doings | divided_by:issues_total | times:100 %}
    {% assign dones_percent = dones | divided_by:issues_total | times:100 %}


    <li>
      <button class="usa-accordion-button"
        aria-controls="amendment-b-{{ item.short }}">
        {{ item.short }}
      </button>
      <div id="amendment-b-{{ item.short }}" class="usa-accordion-content">
 <div class="media usa-grid-full">
   <div class="usa-width-one-sixth">
  <div class="media-left">
    <a href="{{ item.goal }}_{{ item.short }}">
      <img class="media-object" src="{{ site.baseurl }}/{{ item.icon }}" height="100" width="100" alt="">
    </a>
  </div>
   </div> 
 <div class="usa-width-five-sixths">
   <div class="usa-grid-full">
     <span class="badge" style="background-color: #333;">{{ datasets }}</span>
   </div>
  <div class="media-body">
      <div class="usa-grid-full" style="margin-top: 18px;">
      <div class="usa-width-one-third">reported online %</div><div class="usa-width-one-third">statistics in progress %</div><div class="usa-width-one-third">exploring data sources %</div>
      </div>
    <div class="usa-width-one-whole">
      <div class="progress" style="margin-top: 18px;">
      {{ site.data.bootstrap.progress_done }}{{ dones_percent }}{{ site.data.bootstrap.progress_end}}
      {{ site.data.bootstrap.progress_doing }}{{ doings_percent }}{{ site.data.bootstrap.progress_end }}
      {{ site.data.bootstrap.progress_todo }}{{ todos_percent }}{{ site.data.bootstrap.progress_end }}
    </div>
    </div>
   </div>
  </div>
</div>
{% endfor %}
        </div>
    </li>
  </ul>


