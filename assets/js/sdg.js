!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-array"),require("d3-axis"),require("d3-dispatch"),require("d3-drag"),require("d3-ease"),require("d3-scale"),require("d3-selection")):"function"==typeof define&&define.amd?define(["exports","d3-array","d3-axis","d3-dispatch","d3-drag","d3-ease","d3-scale","d3-selection"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,e,a,r,n,l,i,s){"use strict";function c(){function t(t){z=t.selection?t.selection():t,M=h[0]instanceof Date?i.scaleTime():i.scaleLinear(),M=M.domain(h).range([0,m]).clamp(!0),D=i.scaleLinear().range(M.range()).domain(M.range()).clamp(!0),q=q||M.tickFormat(),z.selectAll(".axis").data([null]).enter().append("g").attr("transform","translate(0,7)").attr("class","axis");var e=z.selectAll(".slider").data([null]),r=e.enter().append("g").attr("class","slider").attr("cursor","ew-resize").attr("transform","translate(0,0)").call(n.drag().on("start",function(){s.select(this).classed("active",!0);var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("start",e,a),d(a)}).on("drag",function(){var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("drag",e,a),d(a)}).on("end",function(){s.select(this).classed("active",!1);var t=D(s.event.x),a=u(M.invert(t));f(a),A.call("end",e,a),d(a)}));r.append("line").attr("class","track").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","#bbb").attr("stroke-width",6).attr("stroke-linecap","round"),r.append("line").attr("class","track-inset").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","#eee").attr("stroke-width",4).attr("stroke-linecap","round"),r.append("line").attr("class","track-overlay").attr("x1",0).attr("y1",0).attr("y2",0).attr("stroke","transparent").attr("stroke-width",40).attr("stroke-linecap","round").merge(e.select(".track-overlay"));var l=r.append("g").attr("class","parameter-value").attr("transform","translate("+M(p)+",0)").attr("font-family","sans-serif").attr("text-anchor","middle");l.append("path").attr("d",g).attr("fill","white").attr("stroke","#777"),x&&l.append("text").attr("font-size",10).attr("y",27).attr("dy",".71em").text(q(p)),t.select(".track").attr("x2",M.range()[1]),t.select(".track-inset").attr("x2",M.range()[1]),t.select(".track-overlay").attr("x2",M.range()[1]),t.select(".axis").call(a.axisBottom(M).tickFormat(q).ticks(w).tickValues(y)),z.select(".axis").select(".domain").remove(),t.select(".axis").attr("transform","translate(0,7)"),t.selectAll(".axis text").attr("fill","#aaa").attr("y",20).attr("dy",".71em").attr("text-anchor","middle"),t.selectAll(".axis line").attr("stroke","#aaa"),t.select(".parameter-value").attr("transform","translate("+M(p)+",0)"),c()}function c(){if(x){var t=[];z.selectAll(".axis .tick").each(function(e){t.push(Math.abs(e-p))});var a=e.scan(t);z.selectAll(".axis .tick text").attr("opacity",function(t,e){return e===a?0:1})}}function u(t){if(k){var a=(t-h[0])%k,r=t-a;return 2*a>k&&(r+=k),t instanceof Date?new Date(r):r}if(b){var n=e.scan(b.map(function(e){return Math.abs(t-e)}));return b[n]}return t}function d(e){p!==e&&(p=e,A.call("onchange",t,e),c())}function f(t,e){e=void 0!==e&&e;var a=z.select(".parameter-value");e&&(a=a.transition().ease(l.easeQuadOut).duration(o)),a.attr("transform","translate("+M(t)+",0)"),x&&z.select(".parameter-value text").text(q(t))}var p=0,v=0,h=[0,10],m=100,x=!0,g="M-5.5,-5.5v10l6,5.5l6,-5.5v-10z",k=null,y=null,b=null,q=null,w=null,A=r.dispatch("onchange","start","end","drag"),z=null,M=null,D=null;return t.min=function(e){return arguments.length?(h[0]=e,t):h[0]},t.max=function(e){return arguments.length?(h[1]=e,t):h[1]},t.domain=function(e){return arguments.length?(h=e,t):h},t.width=function(e){return arguments.length?(m=e,t):m},t.tickFormat=function(e){return arguments.length?(q=e,t):q},t.ticks=function(e){return arguments.length?(w=e,t):w},t.value=function(e){if(!arguments.length)return p;var a=D(M(e)),r=u(M.invert(a));return f(r,!0),d(r),t},t.default=function(e){return arguments.length?(v=e,p=e,t):v},t.step=function(e){return arguments.length?(k=e,t):k},t.tickValues=function(e){return arguments.length?(y=e,t):y},t.marks=function(e){return arguments.length?(b=e,t):b},t.handle=function(e){return arguments.length?(g=e,t):g},t.displayValue=function(e){return arguments.length?(x=e,t):x},t.on=function(){var e=A.on.apply(A,arguments);return e===A?t:e},t}var o=200;t.sliderHorizontal=function(){return c()},Object.defineProperty(t,"__esModule",{value:!0})});(function($, d3, window, document, undefined) {

  // Create the defaults once
  var pluginName = 'sdgMap',
    defaults = {
      serviceUrl: 'https://geoportal1-ons.opendata.arcgis.com/datasets/686603e943f948acaa13fb5d2b0f1275_4.geojson',
      width: 590,
      height: 590,
      nameProperty: 'lad16nm',
      idProperty: 'lad16cd',
      projectionFunc: d3.geoMercator,
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.geoCodeRegEx = this.options.geoCodeRegEx;

    this.valueRange = [_.min(_.pluck(this.options.geoData, 'Value')), _.max(_.pluck(this.options.geoData, 'Value'))];
    this.colorRange = ['#b4c5c1', '#004433'];

    this.years = _.uniq(_.pluck(this.options.geoData, 'Year'));
    this.currentYear = this.years[0];

    this.noValueFillColor = '#f0f0f0';

    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var centered, projection, path,
        g, effectLayer, resetButton,
        tooltip, slider, infoPanel,
        zoomControls,
        that = this,
        width = this.options.width,
        height = this.options.height;

      // Define color scale
      var color = d3.scaleLinear()
        .domain(this.valueRange)
        //.clamp(true)
        .range(this.colorRange);

      // Load map data
      d3.json(this.options.serviceUrl, function(error, mapData) {

        if(error || !mapData.features) {
          return showError.call(that);
        }

        var features = mapData.features;

        initialiseUI.call(that);

        projection = that.options.projectionFunc().fitSize([width, height], mapData);
        path = d3.geoPath().projection(projection);

        // Draw each geographical area as a path
        that.mapLayer.selectAll('path')
          .data(features)
          .enter().append('path')
          .attr('d', path)
          .attr('vector-effect', 'non-scaling-stroke')
          .style('fill', getFill)
          .style('stroke', '#ccc')
          .on('mouseover', mouseover)
          .on('mouseout', mouseout.bind(that))
          .on('mousemove', showTooltip.bind(that))
          .on('click', clicked.bind(that));

        appendScale.call(that);

      });

      function initialiseUI() {

        $(this.element).html('');

        this.svg = d3.select(this.element).append("svg")
          .attr("width", this.options.width)
          .attr("height", this.options.height);

        // Add background
        this.svg.append('rect')
          .attr('class', 'background')
          .attr('width', this.options.width)
          .attr('height', this.options.height)
          .on('click', clicked);

        g = this.svg.append('g');

        effectLayer = g.append('g')
          .classed('effect-layer', true);

        this.mapLayer = g.append('g')
          .classed('map-layer', true);

        tooltip = $('<div />').attr('class', 'tooltip hidden');
        $(this.element).append(tooltip);

        resetButton = $('<button />')
          .attr('id', 'resetButton')
          .html('<i class="fa fa-refresh"></i>Reset')
          .on('click', clicked.bind(this, null));
        $(this.element).append(resetButton);

        slider = d3.sliderHorizontal()
          .min(_.min(this.years))
          .max(_.max(this.years))
          .step(1)
          .width(200)
          .tickFormat(d3.format('d'))
          .displayValue(false)
          .tickValues(this.years)
          .on('onchange', updateCurrentYear.bind(this));

        $(this.element).append($('<div />').attr('id', 'slider'));

        d3.select("#slider").append("svg")
          .attr("width", 275)
          .attr("height", 100)
          .append("g")
          .attr("transform", "translate(30,30)")
          .call(slider);

        infoPanel = $('<div />').attr('id', 'infoPanel');
        $(this.element).append(infoPanel);
      }

      function appendScale() {
        var key = d3.select(this.element).append("svg").attr("id", "key").attr("width", this.options.width).attr("height", 40);

        var length = 5;
        var color = d3.scaleLinear().domain([0, length - 1]).range(this.colorRange);
        var value = d3.scaleLinear().domain([0, length]).range(this.valueRange);

        for (var i = 0; i < length; i++) {
          key.append('rect')
            .attr('x', i * this.options.width / 5)
            .attr('y', 0)
            .attr('width', this.options.width / 5)
            .attr('height', 20)
            .attr('fill', color(i));
        }

        for (var i = 0; i < length; i++) {
          key.append('text')
            .attr('x', i * this.options.width / 5)
            .attr('y', 34)
            .attr('font-size', 13)
            .html(Math.floor(value(i)));
        }
      }

      function showError() {
        $(this.element).html(
          $('<div />').attr('class', 'alert alert-danger')
                      .html('Sorry, the map service is currently unavailable')
        );
      }

      // Get area name
      function getName(d){
        return d && d.properties ? d.properties[that.options.nameProperty] : null;
      }

      // Get
      function getValue(d) {
        var geoDataItem = _.findWhere(this.options.geoData, {
          GeoCode: d.properties[this.options.idProperty],
          Year: +this.currentYear
        });

        return geoDataItem ? geoDataItem.Value : undefined;
      }

      function getYearValues(d) {
        return _.where(this.options.geoData, {
          GeoCode: d.properties[this.options.idProperty]
        });
      }

      function updateCurrentYear(year) {
        this.currentYear = year.toString();
        this.mapLayer.selectAll('path').transition().duration(500)
          .style('fill', function(d){  return getFill(d); });
      }

      // Get area color
      function getFill(d){
        if(that.isInScope(d)) {
          var value = getValue.call(that, d);
          return value === undefined ? that.noValueFillColor : color(value);
        } else {
          return 'transparent';
        }
      }

      function getYearByYearMarkup(d) {
        var yearValues = getYearValues.call(this, d),
          isInScope = this.isInScope(d),
          content = '<h2>' + getName(d) + '</h2>';

        if(yearValues.length) {
          content += '<table><tr>' +
            _.map(_.pluck(yearValues, 'Year'), function(year) { return '<th>' + year + '</th>'; }).join('') +
            '</tr><tr>' +
            _.map(_.pluck(yearValues, 'Value'), function(value) { return '<td>' + value + '</td>'; }).join('') +
            '</tr></table>';
        } else {
          if(!isInScope) {
            content += '<p>Area out of scope</p>';
          } else {
            content += '<p>No data available</p>';
          }
        }

        return content;
      }

      function showInfoPanel(d) {
        infoPanel.html(getYearByYearMarkup.call(this, d));
        infoPanel.fadeIn();
      }

      function hideInfoPanel() {
        infoPanel.fadeOut();
      }

      // When clicked, zoom in
      function clicked(d) {
        var x, y, k;

        if(!that.isInScope(d)) {
          return;
        }

        // Compute centroid of the selected path
        if (d && centered !== d) {
          var centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          centered = d;
          var bounds = path.bounds(d),
            boundsWidth = bounds[1][0] - bounds[0][0],
            boundsHeight = bounds[1][1] - bounds[0][1];
          k = Math.min(Math.floor(width / boundsWidth), Math.floor(height / boundsHeight)) * 0.35;

          showInfoPanel.call(this, d);
          resetButton.show();

        } else {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;

          hideInfoPanel();
          resetButton.hide();
        }

        // Highlight the clicked area
        this.mapLayer
          .selectAll('path')
          .style('stroke', function(d) {
            return centered && d === centered ? '#000' : '#ccc';
          })
          .attr('class', function(d) {
            return centered && d === centered ? 'selected' : '';
          });

        // Zoom
        g.transition()
          .duration(750)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
      }

      function mouseover(d){
        // ensure that this element doesn't go after a selected element, if any:
        var selected = d3.select('path.selected').node();

        if(selected) {
          d3.select(this.parentNode.insertBefore(this, selected)).style('stroke', '#000');

        } else {
          d3.select(this.parentNode.appendChild(this))
            .style('stroke', '#000');
        }
      }

      function mouseout(d){
        // Reset area color
        this.mapLayer.selectAll('path')
          .style('stroke', function(d){ return centered && d === centered ? '#000' : '#ccc';});

        tooltip.addClass("hidden");
      }

      function showTooltip(d) {
        var mouse = d3.mouse(this.svg.node())
          .map( function(d) { return parseInt(d); } );

        tooltip.removeClass("hidden")
          .attr("style", "left:"+(mouse[0] + 10)+"px;top:"+(mouse[1] + 10)+"px")
          .html(getYearByYearMarkup.call(this, d));// +  ' ' + getValue.call(that, d) + ' (' + d.properties.lad16cd + ')' );
      }
    },
    isInScope: function(d) {
      return d === null ? true : d.properties[this.options.idProperty].match(this.options.geoCodeRegEx);
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, d3, window, document);
Chart.plugins.register({
  id: 'rescaler',
  beforeInit: function (chart, options) {
    chart.config.data.allLabels = chart.config.data.labels.slice(0);
  },
  afterDatasetsUpdate: function (chart) {
    _.each(chart.data.datasets, function (ds) {
      if (!ds.initialised) {
        ds.initialised = true;
        ds.allData = ds.data.slice(0);
      }
    });
  },
  afterUpdate: function (chart) {

    if (chart.isScaleUpdate) {
      chart.isScaleUpdate = false;
      return;
    }

    var datasets = _.filter(chart.data.datasets, function (ds, index) {
      var meta = chart.getDatasetMeta(index).$filler;
      return meta && meta.visible;
    });

    var ranges = _.chain(datasets).pluck('allData').map(function (data) {
      return {
        min: _.findIndex(data, _.identity),
        max: _.findLastIndex(data, _.identity)
      };
    }).value();

    var dataRange = ranges.length ? {
      min: _.chain(ranges).pluck('min').min().value(),
      max: _.chain(ranges).pluck('max').max().value()
    } : undefined;

    if (dataRange) {
      chart.data.labels = chart.data.allLabels.slice(dataRange.min, dataRange.max + 1);

      chart.data.datasets.forEach(function (dataset) {
        dataset.data = dataset.allData.slice(dataRange.min, dataRange.max + 1);
      });

      chart.isScaleUpdate = true;
      chart.update();
    }
  }
});function event(sender) {
  this._sender = sender;
  this._listeners = [];
}

event.prototype = {
  attach: function (listener) {
    this._listeners.push(listener);
  },
  notify: function (args) {
    var index;

    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};
var accessibilitySwitcher = function() {

  var contrastIdentifiers = ['default', 'high'];

  function setActiveContrast(contrast) {
    _.each(contrastIdentifiers, function(id) {
      $('body').removeClass('contrast-' + id);
    });
    $('body').addClass('contrast-' + contrast);

    createCookie("contrast", contrast, 365);
  }

  function getActiveContrast() {
    var contrast = _.filter(contrastIdentifiers, function(id) {
      return $('body').hasClass('contrast-' + id);
    });

    return contrast ? contrast : contrastIdentifiers[0];
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  window.onload = function(e) {
    var cookie = readCookie("contrast");
    var contrast = cookie ? cookie : contrastIdentifiers[0];
    setActiveContrast(contrast);
    imageFix(contrast);
  }

  window.onunload = function(e) {
    var contrast = getActiveContrast();
    createCookie("contrast", contrast, 365);
  }

  var cookie = readCookie("contrast");
  var contrast = cookie ? cookie : contrastIdentifiers[0];
  setActiveContrast(contrast);

  ////////////////////////////////////////////////////////////////////////////////////

  _.each(contrastIdentifiers, function(contrast) {
    $('.contrast-switcher').append($('<li />').attr({
      'class': 'nav-link contrast contrast-' + contrast
    }).html($('<a />').attr({
      'href': 'javascript:void(0)',
      'title': 'Set to ' + contrast + ' contrast',
      'data-contrast': contrast,
    }).text('A').click(function() {
      setActiveContrast($(this).data('contrast'));
      imageFix(contrast);
    })));
  });

function imageFix(contrast) {
  if (contrast == 'high') {
    _.each($('img:not([src*=high-contrast])'), function(goalImage){
      $(goalImage).attr('src', $(goalImage).attr('src').replace('img/', 'img/high-contrast/'));
    })
  } else {
    // Remove high-contrast
    _.each($('img[src*=high-contrast]'), function(goalImage){
      $(goalImage).attr('src', $(goalImage).attr('src').replace('high-contrast', ''));
    })
  }
};

};
var indicatorDataStore = function(dataUrl) {
  this.dataUrl = dataUrl;

  this.getData = function() {
    that = this;
    return new Promise(function(resolve, reject) {
      $.getJSON(that.dataUrl, function(data) {
        resolve(data);
      }).fail(function(err) {
        reject(Error(err));
      });      
    });
  };
};var indicatorModel = function (options) {

  Array.prototype.containsValue = function(val) {
    return this.indexOf(val) != -1;
  };

  // events:
  this.onDataComplete = new event(this);
  this.onSeriesComplete = new event(this);
  this.onSeriesSelectedChanged = new event(this);
  this.onUnitsComplete = new event(this);
  this.onUnitsSelectedChanged = new event(this);
  this.onFieldsStatusUpdated = new event(this);
  this.onFieldsCleared = new event(this);
  this.onSelectionUpdate = new event(this);
  this.onNoHeadlineData = new event(this);

  // data rounding:
  this.roundingFunc = options.roundingFunc || function(value) {
    var to = 3, mult = Math.pow(10, to - Math.floor(Math.log(Math.abs(value)) / Math.LN10) - 1);
    return Math.round(value * mult) / mult;
  };

  // json conversion:
  var convertJsonFormat = function(data) {
    var keys = _.keys(data);

    return _.map(data[keys[0]], function(item, i) {
      return _.object(keys, _.map(keys, function(k) {
        return data[k][i];
      }));
    });
  }

  // general members:
  var that = this;
  this.data = convertJsonFormat(options.data);
  this.edgesData = convertJsonFormat(options.edgesData);
  this.hasHeadline = true;
  this.country = options.country;
  this.indicatorId = options.indicatorId;
  this.shortIndicatorId = options.shortIndicatorId;
  this.chartTitle = options.chartTitle;
  this.graphType = options.graphType;
  this.measurementUnit = options.measurementUnit;
  this.dataSource = options.dataSource;
  this.geographicalArea = options.geographicalArea;
  this.footnote = options.footnote;
  this.showData = options.showData;
  this.selectedFields = [];
  this.allowedFields = [];
  this.selectedUnit = undefined;
  this.fieldsByUnit = undefined;
  this.dataHasUnitSpecificFields = false;
  this.fieldValueStatuses = [];
  this.validParentsByChild = {};
  this.hasGeoData = false;
  this.geoData = [];
  this.geoCodeRegEx = options.geoCodeRegEx;
  this.showMap = options.showMap;

  // initialise the field information, unique fields and unique values for each field:
  (function initialise() {

    var extractUnique = function(prop) {
      return _.chain(that.data).pluck(prop).uniq().sortBy(function(year) {
        return year;
      }).value();
    };

    that.years = extractUnique('Year');

    if(that.data[0].hasOwnProperty('GeoCode')) {
      that.hasGeoData = true;

      // Year, GeoCode, Value
      that.geoData = _.filter(that.data, function(dataItem) {
        return dataItem.GeoCode;
      });
    }

    if(that.data[0].hasOwnProperty('Units')) {
      that.units = extractUnique('Units');
      that.selectedUnit = that.units[0];

      // what fields have values for a given unit?
      that.fieldsByUnit = _.chain(_.map(that.units, function(unit) {
        return _.map(_.filter(Object.keys(that.data[0]), function (key) {
              return ['Year', 'Value', 'Units'].indexOf(key) === -1;
          }), function(field) {
          return {
            unit: unit,
            field: field,
            fieldData: !!_.find(_.where(that.data, { Units: unit }), function(d) { return d[field]; })
          };
        });
      })).map(function(r) {
        return r.length ? {
          unit: r[0].unit,
          fields: _.pluck(_.where(r, { fieldData: true }), 'field')
        } : {};
      }).value();

      // determine if the fields vary by unit:
      that.dataHasUnitSpecificFields = !_.every(_.pluck(that.fieldsByUnit, 'fields'), function(fields) {
        return _.isEqual(_.sortBy(_.pluck(that.fieldsByUnit, 'fields')[0]), _.sortBy(fields));
      });
    }

    that.fieldItemStates = _.map(_.filter(Object.keys(that.data[0]), function (key) {
        return ['Year', 'Value', 'Units', 'GeoCode'].indexOf(key) === -1;
      }), function(field) {
      return {
        field: field,
        hasData: true,
        values: _.map(_.chain(that.data).pluck(field).uniq().filter(function(f) { return f; }).sort().value(),
          function(f) { return {
            value: f,
            state: 'default',
            hasData: true
          };
        })
      };
    });

    // Set up the validParentsByChild object, which lists the parent field
    // values that should be associated with each child field value.
    var parentFields = _.pluck(that.edgesData, 'From');
    var childFields = _.pluck(that.edgesData, 'To');
    that.validParentsByChild = {};
    _.each(childFields, function(childField, fieldIndex) {
      var fieldItemState = _.findWhere(that.fieldItemStates, {field: childField});
      var childValues = _.pluck(fieldItemState.values, 'value');
      var parentField = parentFields[fieldIndex];
      that.validParentsByChild[childField] = {};
      _.each(childValues, function(childValue) {
        var rowsWithParentValues = _.filter(that.data, function(row) {
          var childMatch = row[childField] == childValue;
          var parentNotEmpty = row[parentField];
          return childMatch && parentNotEmpty;
        });
        var parentValues = _.pluck(rowsWithParentValues, parentField);
        parentValues = _.uniq(parentValues);
        that.validParentsByChild[childField][childValue] = parentValues;
      });
    });

    that.selectableFields = _.pluck(that.fieldItemStates, 'field');

    // determine if there are any 'child' fields: those that can
    // only be selected if their parent has one or more selections:
    that.allowedFields = _.difference(that.selectableFields, _.pluck(that.edgesData, 'To'));

    // prepare the data according to the rounding function:
    that.data = _.map(that.data, function(item) {

      // only apply a rounding function for non-zero values:
      if(item.Value != 0) {
        item.Value = that.roundingFunc(item.Value);
      }

      // remove any undefined/null values:
      _.each(Object.keys(item), function(key) {
        if(_.isNull(item[key]) || _.isUndefined(item[key])) {
          delete item[key];
        }
      });

      return item;
    });

    that.datasetObject = {
      fill: false,
      pointHoverRadius: 5,
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 1,
      tension: 0,
      spanGaps: false
    };

    that.footerFields = {
      'Source': that.dataSource,
      'Geographical Area': that.geographicalArea,
      'Unit of Measurement': that.measurementUnit,
      'Footnote': that.footnote,
    };
  }());

  var headlineColor = '777777';
  var colors = ['7e984f', '8d73ca', 'aaa533', 'c65b8a', '4aac8d', 'c95f44'];

  // allow headline + (2 x others)
  var maxDatasetCount = 2 * colors.length;

  this.getHeadline = function(fields) {
    var that = this, allUndefined = function (obj) {
      for (var loop = 0; loop < that.selectableFields.length; loop++) {
        if (obj[that.selectableFields[loop]])
          return false;
      }
      return true;
    };

    return _.chain(that.data)
      .filter(function (i) {
        return allUndefined(i);
      })
      .sortBy(function (i) {
        return that.selectedUnit ? i.Units : i.Year;
      })
      .map(function (d) {
        return _.pick(d, _.identity);
      })
      .value();
  };

  this.clearSelectedFields = function() {
    this.selectedFields = [];
    this.getData();
    this.onFieldsCleared.notify();
  };

  this.updateSelectedFields = function (fields) {
    this.selectedFields = fields;

    // update parent/child statuses:
    var selectedFields = _.pluck(this.selectedFields, 'field');
    _.each(this.edgesData, function(edge) {
      if(!_.contains(selectedFields, edge.From)) {
        // don't allow any child fields of this association:
        this.selectedFields = _.without(this.selectedFields, _.findWhere(this.selectedFields, {
          field: edge.From
        }));
      }
    });

    // reset the allowedFields:
    this.allowedFields = _.difference(this.selectableFields, _.pluck(this.edgesData, 'To'));

    // and reinstate based on selectedFields:
    var parentFields = _.pluck(this.edgesData, 'From');
    _.each(parentFields, function(parentField) {
      if(_.contains(selectedFields, parentField)) {
        // resinstate
        var childFields = _.chain(that.edgesData).where({ 'From' : parentField }).pluck('To').value();
        that.allowedFields = that.allowedFields.concat(childFields);
        // check each value in the child fields to see if it has data in common
        // with the selected parent value.
        var selectedParent = _.find(that.selectedFields, function(selectedField) {
          return selectedField.field == parentField;
        });
        _.each(that.fieldItemStates, function(fieldItem) {
          // We only care about child fields.
          if (_.contains(childFields, fieldItem.field)) {
            var fieldHasData = false;
            _.each(fieldItem.values, function(childValue) {
              var valueHasData = false;
              _.each(selectedParent.values, function(parentValue) {
                if (_.contains(that.validParentsByChild[fieldItem.field][childValue.value], parentValue)) {
                  valueHasData = true;
                  fieldHasData = true;
                }
              });
              childValue.hasData = valueHasData;
            });
            fieldItem.hasData = fieldHasData;
          }
        });
      }
    });

    // remove duplicates:
    that.allowedFields = _.uniq(that.allowedFields);

    this.getData();
    this.onSelectionUpdate.notify({
      selectedFields: fields,
      allowedFields: that.allowedFields
    });
  };

  this.updateSelectedUnit = function(selectedUnit) {
    this.selectedUnit = selectedUnit;
    
    // if fields are dependent on the unit, reset:
    this.getData({
      unitsChangeSeries: this.dataHasUnitSpecificFields
    });
    
    this.onUnitsSelectedChanged.notify(selectedUnit);
  };

  this.getCombinationData = function(obj) {
    var getCombinations = function(fields, arr, n) {
      var index = 0, ret = [];
      for(var i = 0; i < arr.length; i++) {
        var elem = (n == 1) ? arr[i] : arr.shift();
        var field = (n == 1) ? fields[i] : fields.shift();
        for(var j = 0; j < elem.length; j++) {
          if(n == 1) {
            ret.push({
              value: elem[j],
              field: field
            });
          } else {
            var childperm = getCombinations(fields.slice(), arr.slice(), n-1);
            for(var k = 0; k < childperm.length; k++) {
              ret.push([{
                value: elem[j],
                field: field
              }].concat(childperm[k]));
            }
          }
        }
      }
      return ret;
    };

    var	loop = 1,
        res = [],
        src = JSON.parse(JSON.stringify(obj));

    for(; loop <= src.length; loop++) {
      obj = JSON.parse(JSON.stringify(src));
      res = res.concat(getCombinations(_.pluck(obj, 'field'), _.pluck(obj, 'values'), loop));
    }

    return _.map(res, function(r) {
      if(!_.isArray(r)) {
        r = [r];
      }
      return _.object(
        _.pluck(r, 'field'),
        _.pluck(r, 'value')
      );
    });
  };

  this.getData = function(options) {
    // field: 'Grade'
    // values: ['A', 'B']
    var options = _.defaults(options || {}, {
        initial: false,
        unitsChangeSeries: false
      }),
      fields = this.selectedFields,
      selectedFieldTypes = _.pluck(fields, 'field'),
      datasets = [],
      that = this,
      seriesData = [],
      headlineTable = undefined,
      datasetIndex = 0,
      getCombinationDescription = function(combination) {
        return _.map(Object.keys(combination), function(key) {
          return combination[key];
          //return key + ' ' + combination[key];
        }).join(', ');
      },
      getColor = function(datasetIndex) {

        // offset if there is no headline data:
        if(!that.hasHeadline) {
          datasetIndex += 1;
        }

        if(datasetIndex === 0) {
          return headlineColor;
        } else {
          if(datasetIndex > colors.length) {
            return colors[datasetIndex - 1 - colors.length];
          } else {
            return colors[datasetIndex - 1];
          }
        }

        return datasetIndex === 0 ? headlineColor : colors[datasetIndex];
      },
      getBorderDash = function(datasetIndex) {

        // offset if there is no headline data:
        if(!this.hasHeadline) {
          datasetIndex += 1;
        }

        // 0 -
        // the first dataset is the headline:
        return datasetIndex > colors.length ? [5, 5] : undefined;
      },
      convertToDataset = function (data, combinationDescription /*field, fieldValue*/) {
        // var fieldIndex = field ? _.findIndex(that.selectedFields, function (f) {
        //     return f === field;
        //   }) : undefined,
        var fieldIndex,
          ds = _.extend({
            label: combinationDescription ? combinationDescription : that.country,
            borderColor: '#' + getColor(datasetIndex),
            backgroundColor: '#' + getColor(datasetIndex),
            pointBorderColor: '#' + getColor(datasetIndex),
            borderDash: getBorderDash(datasetIndex),
            data: _.map(that.years, function (year) {
              var found = _.findWhere(data, {
                Year: year
              });
              return found ? found.Value : null;
            }),
            borderWidth: combinationDescription ? 2 : 4
          }, that.datasetObject);
        datasetIndex++;
        return ds;
      };

    if (fields && !_.isArray(fields)) {
      fields = [].concat(fields);
    }

    var isSingleValueSelected = function() { return that.selectedFields.length === 1 && that.selectedFields[0].values.length === 1; },
        matchedData = that.data;

    // filter the data:
    //if(!isSingleValueSelected()) {
    if(that.selectedUnit) {
      matchedData = _.where(matchedData, { Units: that.selectedUnit});
    }

    matchedData = _.filter(matchedData, function(rowItem) {
      var matched = false;
      for(var fieldLoop = 0; fieldLoop < that.selectedFields.length; fieldLoop++) {
        if(that.selectedFields[fieldLoop].values.containsValue(rowItem[that.selectedFields[fieldLoop].field])) {
          matched = true;
          break;
        }
      }
      return matched;
    });

    var fieldSelectionInfo = [];

    this.onFieldsStatusUpdated.notify({
      data: this.fieldItemStates,
      selectionStates: fieldSelectionInfo
    });

    // get the headline data:
    var headline = this.getHeadline();

    // all units for headline data:
    if(headline.length) {
      headlineTable = {
        title: 'Headline data',
        headings: that.selectedUnit ? ['Year', 'Units', 'Value'] : ['Year', 'Value'],
        data: _.map(headline, function (d) {
          return that.selectedUnit ? [d.Year, d.Units, d.Value] : [d.Year, d.Value];
        })
      };
    }

    // headline plot should use the specific unit, if any,
    // but there may not be any headline data at all, or for the
    // specific unit:
    if(that.selectedUnit) {
      headline = _.where(headline, { Units : that.selectedUnit });
    }

    // only add to the datasets if there is any headline data:
    if(headline.length) {
      datasets.push(convertToDataset(headline));
    } else {
      this.hasHeadline = false;
    }

    // extract the possible combinations for the selected field values
    var combinations = this.getCombinationData(this.selectedFields);

    var filteredDatasets = [];
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    _.each(combinations, function(combination) {
      var filtered = _.filter(matchedData, function(dataItem) {
        var matched = true;
        for (var loop = 0; loop < that.selectableFields.length; loop++) {
          if (dataItem[that.selectableFields[loop]] !== combination[that.selectableFields[loop]])
            matched = false;
        }
        return matched;
      });

      if(filtered.length) {
        // but some combinations may not have any data:
        filteredDatasets.push({
          data: filtered,
          combinationDescription: getCombinationDescription(combination)
        });
      }
    });

    var datasetCountExceedsMax = false;
    // restrict count if it exceeds the limit:
    if(filteredDatasets.length > maxDatasetCount) {
      datasetCountExceedsMax = true;
    }

    _.chain(filteredDatasets)
      .sortBy(function(ds) { return ds.combinationDescription; })
      .each(function(ds) { datasets.push(convertToDataset(ds.data, ds.combinationDescription)); });

    // convert datasets to tables:
    var selectionsTable = {
      data: []
    };
    selectionsTable.headings = ['Year'].concat(_.pluck(datasets, 'label'));
    _.each(this.years, function(year, yearIndex) {
      selectionsTable.data.push([year].concat(_.map(datasets, function(ds) {
        return ds.data[yearIndex]
      })));
    });
      
    this.onDataComplete.notify({
      datasetCountExceedsMax: datasetCountExceedsMax,
      datasets: datasetCountExceedsMax ? datasets.slice(0, maxDatasetCount) : datasets,
      labels: this.years,
      headlineTable: headlineTable,
      selectionsTable: selectionsTable,
      indicatorId: this.indicatorId,
      shortIndicatorId: this.shortIndicatorId,
      selectedUnit: this.selectedUnit,
      footerFields: this.footerFields
    });

    if(options.initial || options.unitsChangeSeries) {

      if(options.initial) {
        // order the fields based on the edge data, if any:
        if(this.edgesData.length) {
          var orderedEdges = _.chain(this.edgesData)
            .groupBy('From')
            .map(function(value, key) { return [key].concat(_.pluck(value, 'To')); })
            .flatten()
            .value();

          var customOrder = orderedEdges.concat(_.difference(_.pluck(this.fieldItemStates, 'field'), orderedEdges));

          // now order the fields:
          this.fieldItemStates = _.sortBy(this.fieldItemStates, function(item) {
            return customOrder.indexOf(item.field);
          });
        }

        this.onUnitsComplete.notify({
          units: this.units
        });
      }

      // update the series:
      this.onSeriesComplete.notify({
        series: that.dataHasUnitSpecificFields ? _.filter(that.fieldItemStates, function(fis) {
          return _.findWhere(that.fieldsByUnit, { unit : that.selectedUnit }).fields.indexOf(fis.field) != -1;
        }) : this.fieldItemStates,
        allowedFields: this.allowedFields,
        edges: this.edgesData,
        hasGeoData: this.hasGeoData,
        geoData: this.geoData,
        geoCodeRegEx: this.geoCodeRegEx,
        showMap: this.showMap
      });


    } else {
      this.onSeriesSelectedChanged.notify({
        series: this.selectedFields
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    if((options.initial || options.unitsChangeSeries) && !this.hasHeadline) {
      // if there is no initial data, select some:
      this.onNoHeadlineData.notify();
    }
  };
};

indicatorModel.prototype = {
  initialise: function () {
    this.getData({ 
      initial: true
    });
  },
  getData: function () {
    this.getData();
  }
};
var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      serviceUrl: 'http://brock.tips/geojson-us-states/us-states.geo.json',
      nameProperty: 'NAME',
      idProperty: 'STUSPS',
      width: 710,
      height: 350,
      projectionFunc: d3.geoAlbersUsa,
    });
  }
};
var indicatorView = function (model, options) {

  "use strict";

  var view_obj = this;
  this._model = model;

  this._chartInstance = undefined;
  this._rootElement = options.rootElement;
  this._tableColumnDefs = options.tableColumnDefs;
  this._mapView = undefined;
  this._legendElement = options.legendElement;

  var chartHeight = screen.height < options.maxChartHeight ? screen.height : options.maxChartHeight;

  $('.plot-container', this._rootElement).css('height', chartHeight + 'px');

  $(document).ready(function() {
    $(view_obj._rootElement).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      if($(e.target).attr('href') == '#tableview') {
        setDataTableWidth($(view_obj._rootElement).find('#selectionsTable table'));
      } else {
        $($.fn.dataTable.tables(true)).css('width', '100%');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
      }
    });

    $(view_obj._legendElement).on('click', 'li', function(e) {
      $(this).toggleClass('notshown');

      var ci = view_obj._chartInstance,
          index = $(this).data('datasetindex'),
          meta = ci.getDatasetMeta(index);

      meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
      ci.update();
    });
  });

  this._model.onDataComplete.attach(function (sender, args) {

    if(view_obj._model.showData) {

      $('#dataset-size-warning')[args.datasetCountExceedsMax ? 'show' : 'hide']();

      if(!view_obj._chartInstance) {
        view_obj.createPlot(args);
      } else {
        view_obj.updatePlot(args);
      }
    }

    view_obj.createSelectionsTable(args);
  });

  this._model.onNoHeadlineData.attach(function() {
    $('#fields .variable-options :checkbox:eq(0)').trigger('click');
  });

  this._model.onSeriesComplete.attach(function(sender, args) {
    view_obj.initialiseSeries(args);

    if(args.hasGeoData && args.showMap) {
      view_obj._mapView = new mapView();
      view_obj._mapView.initialise(args.geoData, args.geoCodeRegEx);
    }
  });

  this._model.onSeriesSelectedChanged.attach(function(sender, args) {
    // var selector;
    // if (args.series.length === view_obj._fieldLimit) {
    //   selector = $('#fields input:not(:checked)');
    //   selector.attr('disabled', true);
    //   selector.parent().addClass('disabled').attr('title', 'Maximum of ' + view_obj._fieldLimit + ' selections; unselect another to select this field');
    // } else {
    //   selector = $('#fields input');
    //   selector.removeAttr('disabled');
    //   selector.parent().removeClass('disabled').removeAttr('title');
    // }
  });

  this._model.onUnitsComplete.attach(function(sender, args) {
    view_obj.initialiseUnits(args);
  });

  this._model.onUnitsSelectedChanged.attach(function(sender, args) {
    // update the plot's y axis label
    // update the data
  });

  this._model.onFieldsCleared.attach(function(sender, args) {
    $(view_obj._rootElement).find(':checkbox').prop('checked', false);
    $(view_obj._rootElement).find('#clear').addClass('disabled');

    // reset available/unavailable fields
    updateWithSelectedFields();

    // #246
    $(view_obj._rootElement).find('.selected').css('width', '0');
    // end of #246
  });

  this._model.onSelectionUpdate.attach(function(sender, args) {
    $(view_obj._rootElement).find('#clear')[args.selectedFields.length ? 'removeClass' : 'addClass']('disabled');

    // loop through the available fields:
    $('.variable-selector').each(function(index, element) {
      var currentField = $(element).data('field');

      // any info?
      var match = _.findWhere(args.selectedFields, { field : currentField });
      var element = $(view_obj._rootElement).find('.variable-selector[data-field="' + currentField + '"]');
      var width = match ? (Number(match.values.length / element.find('.variable-options label').length) * 100) + '%' : '0';

      $(element).find('.bar .selected').css('width', width);

      // is this an allowed field:
      $(element)[_.contains(args.allowedFields, currentField) ? 'removeClass' : 'addClass']('disallowed');
    });
  });

  this._model.onFieldsStatusUpdated.attach(function (sender, args) {
    //console.log('updating field states with: ', args);

    // reset:
    $(view_obj._rootElement).find('label').removeClass('selected possible excluded');

    _.each(args.data, function(fieldGroup) {
      _.each(fieldGroup.values, function(fieldItem) {
        var element = $(view_obj._rootElement).find(':checkbox[value="' + fieldItem.value + '"][data-field="' + fieldGroup.field + '"]');
        element.parent().addClass(fieldItem.state).attr('data-has-data', fieldItem.hasData);
      });
      // Indicate whether the fieldGroup had any data.
      var fieldGroupElement = $(view_obj._rootElement).find('.variable-selector[data-field="' + fieldGroup.field + '"]');
      fieldGroupElement.attr('data-has-data', fieldGroup.hasData);

      // Re-sort the items.
      view_obj.sortFieldGroup(fieldGroupElement);
    });

    _.each(args.selectionStates, function(ss) {
      // find the appropriate 'bar'
      var element = $(view_obj._rootElement).find('.variable-selector[data-field="' + ss.field + '"]');
      element.find('.bar .default').css('width', ss.fieldSelection.defaultState + '%');
      element.find('.bar .possible').css('width', ss.fieldSelection.possibleState + '%');
      element.find('.bar .excluded').css('width', ss.fieldSelection.excludedState + '%');
    });
  });

  $(this._rootElement).on('click', '#clear', function() {
    view_obj._model.clearSelectedFields();
  });

  $(this._rootElement).on('click', '#fields label', function (e) {

    if(!$(this).closest('.variable-options').hasClass('disallowed')) {
      $(this).find(':checkbox').trigger('click');
    }

    e.preventDefault();
    e.stopPropagation();
  });

  $(this._rootElement).on('change', '#units input', function() {
    view_obj._model.updateSelectedUnit($(this).val());
  });

  // generic helper function, used by clear all/select all and individual checkbox changes:
  var updateWithSelectedFields = function() {
    view_obj._model.updateSelectedFields(_.chain(_.map($('#fields input:checked'), function (fieldValue) {
      return {
        value: $(fieldValue).val(),
        field: $(fieldValue).data('field')
      };
    })).groupBy('field').map(function(value, key) {
      return {
        field: key,
        values: _.pluck(value, 'value')
      };
    }).value());
  }

  $(this._rootElement).on('click', '.variable-options button', function(e) {
    var type = $(this).data('type');
    var $options = $(this).closest('.variable-options').find(':checkbox');

    // The clear button can clear all checkboxes.
    if (type == 'clear') {
      $options.prop('checked', false);
    }
    // The select button must only select checkboxes that have data.
    if (type == 'select') {
      $options.parent().not('[data-has-data=false]').find(':checkbox').prop('checked', true)
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', ':checkbox', function(e) {

    // don't permit excluded selections:
    if($(this).parent().hasClass('excluded') || $(this).closest('.variable-selector').hasClass('disallowed')) {
      return;
    }

    updateWithSelectedFields();

    e.stopPropagation();
  });

  $(this._rootElement).on('click', '.variable-selector', function(e) {

    var options = $(this).find('.variable-options');
    var optionsVisible = options.is(':visible');
    $(options)[optionsVisible ? 'hide' : 'show']();

    e.stopPropagation();
  });

  this.initialiseSeries = function(args) {
    if(args.series.length) {
      var template = _.template($("#item_template").html());

      if(!$('button#clear').length) {
        $('<button id="clear" class="disabled">' + translations.indicator.clear_selections + ' <i class="fa fa-remove"></i></button>').insertBefore('#fields');
      }

      $('#fields').html(template({
        series: args.series,
        allowedFields: args.allowedFields,
        edges: args.edges
      }));

      $(this._rootElement).removeClass('no-series');

    } else {
      $(this._rootElement).addClass('no-series');
    }
  };

  this.initialiseUnits = function(args) {
    var template = _.template($('#units_template').html()),
        units = args.units || [];

    $('#units').html(template({
      units: units
    }));

    if(!units.length) {
      $(this._rootElement).addClass('no-units');
    }
  };

  this.updatePlot = function(chartInfo) {
    view_obj._chartInstance.data.datasets = chartInfo.datasets;

    if(chartInfo.selectedUnit) {
      view_obj._chartInstance.options.scales.yAxes[0].scaleLabel.labelString = chartInfo.selectedUnit;
    }

    view_obj._chartInstance.update(1000, true);

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
  };

  this.createPlot = function (chartInfo) {

    var that = this;

    var chartConfig = {
      type: this._model.graphType,
      data: chartInfo,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
        scrollX: true,
        scrollCollapse: true,
        sScrollXInner: '150%',
        scales: {
          xAxes: [{
            maxBarThickness: 150,
            gridLines: {
              color: '#ddd',
            }
          }],
          yAxes: [{
            ticks: {
              suggestedMin: 0
            },
            scaleLabel: {
              display: this._model.selectedUnit ? this._model.selectedUnit : this._model.measurementUnit,
              labelString: this._model.selectedUnit ? this._model.selectedUnit : this._model.measurementUnit
            }
          }]
        },
        layout: {
          padding: {
            top: 20,
            // default of 85, but do a rough line count based on 150
            // characters per line * 20 pixels per row
            bottom: that._model.footnote ? (20 * (that._model.footnote.length / 150)) + 85 : 85
          }
        },
        legendCallback: function(chart) {
            var text = ['<ul id="legend">'];

            _.each(chart.data.datasets, function(dataset, datasetIndex) {
              text.push('<li data-datasetindex="' + datasetIndex + '">');
              text.push('<span class="swatch' + (dataset.borderDash ? ' dashed' : '') + '" style="background-color: ' + dataset.backgroundColor + '">');
              text.push('</span>');
              text.push(dataset.label);
              text.push('</li>');
            });

            text.push('</ul>');
            return text.join('');
        },
        legend: {
          display: false
        },
        title: {
          fontSize: 18,
          fontStyle: 'normal',
          display: this._model.chartTitle,
          text: this._model.chartTitle,
          padding: 20
        },
        plugins: {
          scaler: {}
        }
      }
    };
    if (typeof chartConfigOverrides !== 'undefined') {
      $.extend(true, chartConfig, chartConfigOverrides);
    }

    this._chartInstance = new Chart($(this._rootElement).find('canvas'), chartConfig);

    Chart.pluginService.register({
      afterDraw: function(chart) {
        var $canvas = $(that._rootElement).find('canvas'),
        font = '12px Arial',
        canvas = $canvas.get(0),
        textRowHeight = 20,
        ctx = canvas.getContext("2d");

        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#6e6e6e';

        var getLinesFromText = function(text) {
          var width = parseInt($canvas.css('width')), //width(),
          lines = [],
          line = '',
          lineTest = '',
          words = text.split(' ');

          for (var i = 0, len = words.length; i < len; i++) {
            lineTest = line + words[i] + ' ';

            // Check total width of line or last word
            if (ctx.measureText(lineTest).width > width) {
              // Record and reset the current line
              lines.push(line);
              line = words[i] + ' ';
            } else {
              line = lineTest;
            }
          }

          // catch left overs:
          if (line.length > 0) {
            lines.push(line.trim());
          }

          return lines;
        };

        function putTextOutputs(textOutputs, x) {
          var y = $canvas.height() - 10 - ((textOutputs.length - 1) * textRowHeight);

          _.each(textOutputs, function(textOutput) {
            ctx.fillText(textOutput, x, y);
            y += textRowHeight;
          });
        }

        // TODO Merge this with the that.footerFields object used by table
        var graphFooterItems = [];
        if (that._model.dataSource) {
          graphFooterItems.push(translations.indicator.source + ': ' + that._model.dataSource);
        }
        if (that._model.geographicalArea) {
          graphFooterItems.push(translations.indicator.geographical_area + ': ' + that._model.geographicalArea);
        }
        if (that._model.measurementUnit) {
          graphFooterItems.push(translations.indicator.unit_of_measurement + ': ' + that._model.measurementUnit);
        }

        if(that._model.footnote) {
          var footnoteRows = getLinesFromText('Footnote: ' + that._model.footnote);
          graphFooterItems = graphFooterItems.concat(footnoteRows);

          if(footnoteRows.length > 1) {
            //that._chartInstance.options.layout.padding.bottom += textRowHeight * footnoteRows.length;
            that._chartInstance.resize(parseInt($canvas.css('width')), parseInt($canvas.css('height')) + textRowHeight * footnoteRows.length);
            that._chartInstance.resize();
          }
        }

        putTextOutputs(graphFooterItems, 0);
      }
    });

    $(this._legendElement).html(view_obj._chartInstance.generateLegend());
  };

  this.toCsv = function (tableData) {
    var lines = [],
    headings = _.map(tableData.headings, function(heading) { return '"' + heading + '"'; });

    lines.push(headings.join(','));

    _.each(tableData.data, function (dataValues) {
      var line = [];

      _.each(headings, function (heading, index) {
        line.push(dataValues[index]);
      });

      lines.push(line.join(','));
    });

    return lines.join('\n');
  };

  var setDataTableWidth = function(table) {
    table.find('th').each(function() {
      var textLength = $(this).text().length;
      for(var loop = 0; loop < view_obj._tableColumnDefs.length; loop++) {
        var def = view_obj._tableColumnDefs[loop];
        if(textLength < def.maxCharCount) {
          if(!def.width) {
            $(this).css('white-space', 'nowrap');
          } else {
            $(this).css('width', def.width + 'px');
            $(this).data('width', def.width);
          }
          break;
        }
      }
    });

    table.removeAttr('style width');

    var totalWidth = 0;
    table.find('th').each(function() {
      if($(this).data('width')) {
        totalWidth += $(this).data('width');
      } else {
        totalWidth += $(this).width();
      }
    });

    // ascertain whether the table should be width 100% or explicit width:
    var containerWidth = table.closest('.dataTables_wrapper').width();

    if(totalWidth > containerWidth) {
      table.css('width', totalWidth + 'px');
    } else {
      table.css('width', '100%');
    }
  };

  var initialiseDataTable = function(el) {
    var datatables_options = options.datatables_options || {
      paging: false,
      bInfo: false,
      bAutoWidth: false,
      searching: false,
      responsive: false,
      order: [[0, 'asc']]
    }, table = $(el).find('table');

    datatables_options.aaSorting = [];

    table.DataTable(datatables_options);

    setDataTableWidth(table);
  };

  this.createSelectionsTable = function(chartInfo) {
    this.createTable(chartInfo.selectionsTable, chartInfo.indicatorId, '#selectionsTable', true);
    this.createTableFooter(chartInfo.footerFields, '#selectionsTable');
    this.createDownloadButton(chartInfo.selectionsTable, 'Table', chartInfo.indicatorId, '#selectionsTable');
    this.createSourceButton(chartInfo.shortIndicatorId, '#selectionsTable');
    // Chart buttons
    $('#chartSelectionDownload').empty();
    this.createDownloadButton(chartInfo.selectionsTable, 'Chart', chartInfo.indicatorId, '#chartSelectionDownload');
    this.createSourceButton(chartInfo.shortIndicatorId, '#chartSelectionDownload');
  };

  this.createDownloadButton = function(table, name, indicatorId, el) {
    if(window.Modernizr.blobconstructor) {
      var downloadKey = 'download_csv';
      if (name == 'Chart') {
        downloadKey = 'download_chart';
      }
      if (name == 'Table') {
        downloadKey = 'download_table';
      }
      $(el).append($('<a />').text(translations.indicator[downloadKey])
      .attr({
        'href': URL.createObjectURL(new Blob([this.toCsv(table)], {
          type: 'text/csv'
        })),
        'download': indicatorId + '.csv',
        'title': translations.indicator.download_csv_title,
        'class': 'btn btn-primary btn-download',
        'tabindex': 0
      })
      .data('csvdata', this.toCsv(table)));
    } else {
      var headlineId = indicatorId.replace('indicator', 'headline');
      var id = indicatorId.replace('indicator', '');
      $(el).append($('<a />').text(translations.indicator.download_headline)
      .attr({
        'href': remoteDataBaseUrl + '/headline/' + id + '.csv',
        'download': headlineId + '.csv',
        'title': translations.indicator.download_headline_title,
        'class': 'btn btn-primary btn-download',
        'tabindex': 0
      }));
    }
  }

  this.createSourceButton = function(indicatorId, el) {
    $(el).append($('<a />').text(translations.indicator.download_source)
    .attr({
      'href': remoteDataBaseUrl + '/data/' + indicatorId + '.csv',
      'download': indicatorId + '.csv',
      'title': translations.indicator.download_source_title,
      'class': 'btn btn-primary btn-download',
      'tabindex': 0
    }));
  }

  this.createTable = function(table, indicatorId, el) {

    options = options || {};
    var that = this,
    csv_path = options.csv_path,
    allow_download = options.allow_download || false,
    csv_options = options.csv_options || {
      separator: ',',
      delimiter: '"'
    },
    table_class = options.table_class || 'table table-hover';

    // clear:
    $(el).html('');

    if(table && table.data.length) {
      var currentTable = $('<table />').attr({
        'class': /*'table-responsive ' +*/ table_class,
        'width': '100%'
        //'id': currentId
      });

      currentTable.append('<caption>' + that._model.chartTitle + '</caption>');

      var table_head = '<thead><tr>';

      var getHeading = function(heading, index) {
        var span = '<span class="sort" />';
        var span_heading = '<span>' + heading + '</span>';
        return (!index || heading.toLowerCase() == 'units') ? span_heading + span : span + span_heading;
      };

      table.headings.forEach(function (heading, index) {
        table_head += '<th' + (!index || heading.toLowerCase() == 'units' ? '': ' class="table-value"') + ' scope="col">' + getHeading(heading, index) + '</th>';
      });

      table_head += '</tr></thead>';
      currentTable.append(table_head);
      currentTable.append('<tbody></tbody>');

      table.data.forEach(function (data) {
        var row_html = '<tr>';
        table.headings.forEach(function (heading, index) {
          row_html += '<td' + (!index || heading.toLowerCase() == 'units' ? '' : ' class="table-value"') + '>' + (data[index] ? data[index] : '-') + '</td>';
        });
        row_html += '</tr>';
        currentTable.find('tbody').append(row_html);
      });

      $(el).append(currentTable);

      // initialise data table
      initialiseDataTable(el);

    } else {
      $(el).append($('<p />').text('There is no data for this breakdown.'));
    }
  };

  this.createTableFooter = function(footerFields, el) {
    var footdiv = $('<div />').attr({
      'id': 'selectionTableFooter',
      'class': 'table-footer-text'
    });

    _.each(footerFields, function(val, key) {
      if(val) footdiv.append($('<p />').text(key + ': ' + val));
    });

    $(el).append(footdiv);
  };

  this.sortFieldGroup = function(fieldGroupElement) {
    var sortLabels = function(a, b) {
      var aObj = { hasData: $(a).attr('data-has-data'), text: $(a).text() };
      var bObj = { hasData: $(b).attr('data-has-data'), text: $(b).text() };
      if (aObj.hasData == bObj.hasData) {
        return (aObj.text > bObj.text) ? 1 : -1;
      }
      return (aObj.hasData < bObj.hasData) ? 1 : -1;
    };
    fieldGroupElement.find('label')
    .sort(sortLabels)
    .appendTo(fieldGroupElement.find('.variable-options'));
  }
};
var indicatorController = function (model, view) {
  this._model = model;
  this._view = view;
};

indicatorController.prototype = {
  initialise: function () {
    this._model.initialise();
  }
};
var indicatorSearch = function(inputElement, indicatorDataStore) {
  that = this;
  this.inputElement = inputElement;
  this.indicatorDataStore = indicatorDataStore;
  this.indicatorData = [];
  this.hasErrored = false;

  this.processData = function(data) {
    for(var goalLoop = 0; goalLoop < data.length; goalLoop++) {
      for(var indicatorLoop = 0; indicatorLoop < data[goalLoop].goal.indicators.length; indicatorLoop++) {
        var currentIndicator = data[goalLoop].goal.indicators[indicatorLoop];
        currentIndicator.goalId = data[goalLoop].goal.id;
        currentIndicator.goalTitle = data[goalLoop].goal.title;
        that.indicatorData.push(currentIndicator);
      }
    }
  };

  this.inputElement.keyup(function(e) {
    var searchValue = that.inputElement.val();
    if(e.keyCode === 13 && searchValue.length) {
      window.location.replace(that.inputElement.data('pageurl') + searchValue);
    }
  });

  var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&");
  };

  if($('#main-content').hasClass('search-results')) {

    var results = [],
        that = this,
        searchString = unescape(location.search.substring(1));

    // we got here because of a redirect, so reinstate:
    this.inputElement.val(searchString);

    $('#main-content h1 span').text(searchString);
    $('#main-content h1').show();

    this.indicatorDataStore.getData().then(function(data) {

      that.processData(data);

      var searchResults = _.filter(that.indicatorData, function(indicator) {
        return indicator.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.description.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.keywords.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
      });

      // goal
      //    indicators
      // goal
      //    indicators

      _.each(searchResults, function(result) {
        var goal = _.findWhere(results, { goalId: result.goalId }),
            indicator = {
              parsedTitle: result.title.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedDescription: result.description.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedKeywords: result.keywords.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              hasKeywords: result.keywords && result.keywords.length,
              hasDescription: result.description && result.description.length,
              id: result.id,
              title: result.title,
              href: result.href,
              status: result.status
            };

        if(!goal) {
          results.push({
            goalId: result.goalId,
            goalTitle: result.goalTitle,
            indicators: [indicator]
          });
        } else {
          goal.indicators.push(indicator);
        }
      });

      $('.loader').hide();

      var template = _.template(
        $("script.results").html()
      );

      $('div.results').html(template({
        searchResults: results,
        resultsCount: searchResults.length,
        imgPath: $('.results').data('imgpath')
      }));
    });
  }
};

indicatorSearch.prototype = {

};

$(function() {

  var $el = $('#indicator_search');
  new indicatorSearch($el, new indicatorDataStore($el.data('url')));

  $('#jump-to-search').show();
  $('#jump-to-search a').click(function() {
    if($el.is(':hidden')) {
      $('.navbar span[data-target="search"]').click();
    }
    $el.focus();
  });


});

var reportingStatus = function(indicatorDataStore) {
  this.indicatorDataStore = indicatorDataStore;

  this.getReportingStatus = function() {

    var that = this;

    return new Promise(function(resolve, reject) {

      // if(Modernizr.localStorage &&) {

      // }

      getPercentages = function(values) {

        var percentageTotal = 100;
        var total = _.reduce(values, function(memo, num) { return memo + num; });
        var percentages = _.map(values, function(v) { return (v / total) * percentageTotal; });

        var off = percentageTotal - _.reduce(percentages, function(acc, x) { return acc + Math.round(x) }, 0);
          return _.chain(percentages).
                  map(function(x, i) { return Math.round(x) + (off > i) - (i >= (percentages.length + off)) }).
                  value();
      }

      that.indicatorDataStore.getData().then(function(data) {
        // for each goal, get a percentage of indicators in the various states:
        // notstarted, inprogress, complete
        var mappedData = _.map(data, function(dataItem) {

          var returnItem = {
            goal_id: dataItem.goal.id,
            completeCount: _.where(dataItem.goal.indicators, { status: 'complete' }).length,
            inProgressCount: _.where(dataItem.goal.indicators, { status: 'inprogress' }).length,
            notStartedCount: _.where(dataItem.goal.indicators, { status: 'notstarted' }).length
          };

          returnItem.totalCount = returnItem.notStartedCount + returnItem.inProgressCount + returnItem.completeCount;
          returnItem.counts = [returnItem.completeCount, returnItem.inProgressCount, returnItem.notStartedCount];
          returnItem.percentages = getPercentages([returnItem.completeCount, returnItem.inProgressCount, returnItem.notStartedCount]);
          
          return returnItem;
        });    

        var getTotalByStatus = function(statusType) {
          return _.chain(mappedData).pluck(statusType).reduce(function(sum, n) { return sum + n; }).value();          
        };

        var overall = {
          totalCount: _.chain(mappedData).pluck('totalCount').reduce(function(sum, n) { return sum + n; }).value(),
          counts: [
            getTotalByStatus('completeCount'),
            getTotalByStatus('inProgressCount'),
            getTotalByStatus('notStartedCount')
          ]
        };

        overall.percentages = getPercentages([overall.counts[0], overall.counts[1], overall.counts[2]]);          
        
        resolve({
          goals: mappedData,
          overall: overall
        });
      });     
    });
  };
};

$(function() {

  if($('.container').hasClass('reportingstatus')) {
    var url = $('.container.reportingstatus').attr('data-url'),
        status = new reportingStatus(new indicatorDataStore(url)),
        types = ['Reported online', 'Statistics in progress', 'Exploring data sources'],
        bindData = function(el, data) {
          $(el).find('.goal-stats span').each(function(index, statEl) {
            var percentage = Math.round(Number(((data.counts[index] / data.totalCount) * 100))) + '%';
            
            $(statEl).attr({
              'style': 'width:' + data.percentages[index] + '%',
              'title': types[index] + ': ' + data.percentages[index] + '%'
            });
  
            $(el).find('span.value:eq(' + index + ')').text(data.percentages[index] + '%');
          }); 
        };

    status.getReportingStatus().then(function(data) {
      bindData($('.goal-overall'), data.overall);
      _.each(data.goals, function(goal) {
        var el = $('.goal[data-goalid="' + goal.goal_id + '"]');
        bindData(el, goal);       
      });
    });
  }
});
$(function() {

  var topLevelSearchLink = $('.top-level span:eq(1)');

  var resetForSmallerViewport = function() {
    topLevelSearchLink.text('Search');
    $('.top-level li').removeClass('active');
    $('.top-level span').removeClass('open');
  };  

  $('.top-level span').click(function() {
    var target = $(this).data('target');

    $('.top-level li').removeClass('active');
    topLevelSearchLink.text('Search');

    var targetEl = $('#' + target);
    var wasVisible = targetEl.is(':visible');

    // hide everything:
    $('.menu-target').hide();

    if(target === 'search') {
      $(this).toggleClass('open');
      
      if($(this).hasClass('open') || !wasVisible) {
        $(this).text('Hide');
      } else {
        $(this).text('Search');
      }
    } else {
      // menu click, always hide search:
      topLevelSearchLink.removeClass('open');
      topLevelSearchLink.text('Search');
    }

    if(!wasVisible) {
      targetEl.show();
      $(this).parent().addClass('active');
    }
  });

  $(window).on('resize', function(e) {
    var viewportWidth = window.innerWidth,
        previousWidth = $('body').data('vwidth'),
        breakpointWidth = 768;

    if(viewportWidth > breakpointWidth && previousWidth <= breakpointWidth) {
      // switched to larger viewport:
      $('.menu-target').show();
    } else if(previousWidth >= breakpointWidth && viewportWidth < breakpointWidth) {
      // switched to smaller viewport:
      $('.menu-target').hide();
      resetForSmallerViewport();
    }

    // update the viewport width:
    $('body').data('vwidth', viewportWidth);
  });
});/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},a=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},c=function(t,e){if(""===e)throw new a("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(t,e)},l=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;s>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",""+this)}},u=l[n]=[],h=function(){return new l(this)};if(a[n]=Error[n],u.item=function(t){return this[t]||null},u.contains=function(t){return t+="",-1!==c(this,t)},u.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",-1===c(this,t)&&(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},u.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do for(t=n[i]+"",e=c(this,t);-1!==e;)this.splice(e,1),r=!0,e=c(this,t);while(++i<s);r&&this._updateClassName()},u.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},u.toString=function(){return this.join(" ")},s.defineProperty){var f={get:h,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,f)}catch(g){(void 0===g.number||-2146823252===g.number)&&(f.enumerable=!1,s.defineProperty(i,e,f))}}else s[n].__defineGetter__&&i.__defineGetter__(e,h)}}(self),function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}());/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-blobconstructor-localstorage-setclasses !*/
 !function(e,n,o){function s(e,n){return typeof e===n}function t(){var e,n,o,t,a,l,c;for(var f in i)if(i.hasOwnProperty(f)){if(e=[],n=i[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(t=s(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)l=e[a],c=l.split("."),1===c.length?Modernizr[c[0]]=t:(!Modernizr[c[0]]||Modernizr[c[0]]instanceof Boolean||(Modernizr[c[0]]=new Boolean(Modernizr[c[0]])),Modernizr[c[0]][c[1]]=t),r.push((t?"":"no-")+c.join("-"))}}function a(e){var n=c.className,o=Modernizr._config.classPrefix||"";if(f&&(n=n.baseVal),Modernizr._config.enableJSClass){var s=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");n=n.replace(s,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(n+=" "+o+e.join(" "+o),f?c.className.baseVal=n:c.className=n)}var r=[],i=[],l={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var o=this;setTimeout(function(){n(o[e])},0)},addTest:function(e,n,o){i.push({name:e,fn:n,options:o})},addAsyncTest:function(e){i.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr,Modernizr.addTest("blobconstructor",function(){try{return!!new Blob}catch(e){return!1}},{aliases:["blob-constructor"]}),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}});var c=n.documentElement,f="svg"===c.nodeName.toLowerCase();t(),a(r),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,document);