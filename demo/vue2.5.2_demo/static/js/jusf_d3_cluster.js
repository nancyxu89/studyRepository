(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory)
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports)
  } else {
    factory(root.jusfD3Cluster = root.jusfD3Cluster || {})
  }
})(
  typeof window !== 'undefined' ? window : this, function(exports) {
    'use strict'
    var version = '1.0.0'
    var d3 = require('d3/d3')
    if (typeof d3 === 'undefined') throw new Error('Please include D3.js Library first.')

    /**
     * 获取基本配置： 画布宽高width、height 颜色colors
     *
     * @param containerName
     * @param datas
     * @returns {{container: (*|jQuery|HTMLElement), width: *, height: *, colors: *,
 *          title: *, backgroundColor: *}}
     */
    function setBaseSVGConfig(containerName, datas) {
      var container = document.getElementById(containerName)

      var width = (datas.width != null && datas.width != '') ? datas.width
        : (container.offsetWidth || 800)
      var height = (datas.height != null && datas.height != '') ? datas.height
        : (container.offsetHeight || 600)

      width = (width + '').replace('px', '')
      height = (height + '').replace('px', '')
      if (width.indexOf('%') > -1) {
        width = 800
      }
      if (height.indexOf('%') > -1) {
        height = 600
      }

      var colors = datas.colors != null ? datas.colors : ['#FC3C1D', '#F9713A', '#469EE9', '#53C76B',
        '#FF3C00', '#41CB5D',
        '#3797F1', '#FF7008', '#FBB367', '#80B1D2', '#FB8070', '#CC99FF',
        '#B0D961', '#99CCCC', '#BEBBD8', '#FFCC99', '#8DD3C8', '#FF9999',
        '#CCEAC4', '#BB81BC', '#FBCCEC', '#CCFF66', '#99CC66', '#66CC66',
        '#FF6666', '#FFED6F', '#ff7f50', '#87cefa']
      var titleText = datas.titleText != null ? datas.titleText : ''
      var backgroundColor = datas.backgroundColor != null ? datas.backgroundColor
        : 'transparent'
      var initZoom = datas.initZoom != null ? datas.initZoom : 0.6

      return {
        container: container,
        width: width,
        height: height,
        colors: colors,
        titleText: titleText,
        backgroundColor: backgroundColor,
        initZoom: initZoom
      }
    }

    /**
     * 绘制集群
     */
    var id = 0
    var rootData
    var nodes, links

    /**
     * 绘制集群布局图形
     *
     * @param containerName
     * @param datas
     * @param fn，文本信息点击事件处理函数名称
     * @param param，点击事件需要获取参数名称
     *            调用方法简介： drawD3Cluster('container', datas, fn, ['category',
     *            'id']); drawD3Cluster('container', datas, fn, 'category');
     */
    function drawD3Cluster(containerName, datas, fn, param) {
      var config = setBaseSVGConfig(containerName, datas)
      config.containerName = containerName
      config.datas = datas

      /**
       * 获取数据
       */
      rootData = datas.data

      // 设置节点id
      traverseNodesID(rootData)
      // 在SVG画布上添加节点、边
      setNodesLinks(rootData, config, fn, param)
    }

    /**
     * 设置节点id
     *
     * @param node
     */
    function traverseNodesID(node) {
      if (!node.id) {
        node.id = id
        id++
      }

      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          traverseNodesID(node.children[i])
        }
      }
    }

    /**
     * 在SVG画布上添加节点、边
     *
     * @param root，格式： {
	 *            category: 0, name: '', children: [ { category: 1, name: '', }, {
	 *            category: 2, name: '', children: [ { category: 2, name: '', } ] } ] }
     */
    var cluster, // 定义一个集群布局对象
      globalContainer, // 整个svg的容器对象
      container, // nodes、links的容器对象
      linkContainer, // 边的容器对象
      colors, diagonal // 创建新的斜线生成器
    function setNodesLinks(root, config, fn, param) {
      colors = config.colors
      var initZoom = config.initZoom
      var width = config.width, height = config.height, backgroundColor = config.backgroundColor

      var svg, // 创建svg
        tagName = document.getElementById(config.containerName).tagName

      if (tagName == 'svg') {
        d3.select('#' + config.containerName).select('.globalContainer').remove()
        svg = d3.select('#' + config.containerName)
      } else {
        d3.select('#' + config.containerName).selectAll('svg').remove()
        svg = d3.select('#' + config.containerName).append('svg')
      }

      svg.attr('width', '100%' /* width */).attr('height', height).style(
        'background-color', backgroundColor)

      // svg中建立style，用于节点以及连接线
      var style = svg.append('style')
        .attr('type', 'text/css')
        .text('.clusterLink {fill: none;stroke-opacity: 1;stroke-width: 1.5px;}.clusterNode {cursor: pointer;}')

      // 创建集群布局对象
      cluster = d3.layout.cluster().size([360, 500]).separation(
        function(a, b) {
          return (a.parent == b.parent ? 1 : 2) / a.depth
        })
      globalContainer = svg.append('g')
        .attr('class', 'globalContainer')
      // 整个svg的容器对象
      container = globalContainer
        .append('g')
        .attr('class', 'gNodeLinkContainer')

      // links的容器对象
      linkContainer = container.append('g')

      // 定义缩放行为
      var zoom = d3.behavior.zoom().scaleExtent([0.2, 4]).on(
        'zoom',
        function() {
          container.attr('transform', 'translate(' +
            d3.event.translate + ')scale(' + d3.event.scale +
            ')')
        })

      // 创建新的斜线生成器
      diagonal = d3.svg.diagonal.radial().projection(function(d) {
        return [d.y, d.x / 180 * Math.PI]
      })

      // 为当前选择的元素集调用缩放函数
      svg.call(zoom)

      // 设置图形初始位置
      zoom.translate([width / 2, height / 2])
      zoom.scale(initZoom)
      container.attr('transform', 'translate(' + (width / 2) + ',' +
        (height / 2) + ')scale(' + zoom.scale() + ')')

      // 获取节点、边信息，通过设置children、_children参数，初次显示三层数据，depth=0，1，2
      nodes = cluster.nodes(root)
      links = cluster.links(nodes)
      // 设置节点信息
      nodes.forEach(function(d) {
        if (d.depth > 1) {
          if (d.children) {
            d._children = d.children
            d.children = null
          }
        }
      })

      // 设置中心坐标
      root.x0 = 0
      root.y0 = 0

      drawNodesLinks(root, fn, param)
      drawLegendTitle(globalContainer, config.datas, colors, width, height)
    }

    /**
     *
     * @param data
     * @param fn
     * @param param
     */
    function drawNodesLinks(data, fn, param) {
      // 获取节点、边信息,links根据nodes的children属性获取对应信息
      nodes = cluster.nodes(rootData)
      links = cluster.links(nodes)
      // 设置新增显示节点位置策略：之前节点的位置相对不变，后续节点往外层增加
      nodes.forEach(function(d) {
        if (d.depth > 2) {
          d.y = d.depth * (d.depth / 2) * 150
        } else {
          d.y = d.depth * 150
        }
      })

      // 设置边信息
      var linkUpdate = linkContainer.selectAll('.clusterLink').data(links,
        function(d) {
          return d.target.id
        })
      var linkEnter = linkUpdate.enter()
      var linkExit = linkUpdate.exit()

      linkEnter.append('path')
        .attr('class', 'clusterLink')
        .attr('d',
          function(d) {
            var o = {
              x: data.x0,
              y: data.y0
            }
            return diagonal({
              source: o,
              target: o
            })
          }).transition().duration(500).attr('d', diagonal)

      linkUpdate.attr('stroke', function(d) {
        return colors[d.source.category % colors.length]
      }).transition().duration(500).attr('d', diagonal)

      linkExit.transition().duration(500).attr('d', function(d) {
        var o = {
          x: data.x,
          y: data.y
        }
        return diagonal({
          source: o,
          target: o
        })
      }).remove()

      // 设置节点信息
      var nodeUpdate = container.selectAll('.clusterNode').data(nodes,
        function(d) {
          return d.id
        })
      var nodeEnter = nodeUpdate.enter()
      var nodeExit = nodeUpdate.exit()

      var enterNodes = nodeEnter.append('g').attr('class', function(d) {
        return 'clusterNode'
      }).attr('transform', function(d) {
        return 'translate(' + project(data.x0, data.y0) + ')'
      })

      enterNodes.append('circle').attr('r', 0)
        .attr('fill', function(d) {
          var index
          if (d.category == null) {
            // return 'transparent';
            index = d.parent.category % colors.length
          } else {
            index = d.category % colors.length
          }
          return colors[index]
        }).attr('stroke', function(d) {
          if (d.depth == 0 && d.category != null) {
            return colors[d.category % colors.length]
          }

          if (d.depth == 1 && d.category != null) {
            return colors[d.category % colors.length]
          }

          return null
        }).attr('stroke-opacity', 0.5).attr('stroke-width', function(d) {
          if (d.depth == 0) {
            return 10
          }

          if (d.depth == 1) {
            return 6
          }

          return 0
        }).on('click', function(d) {
          if (d.depth > 0) {
            toggle(d)
            drawNodesLinks(d, fn, param)
          }
        })

      enterNodes.append('g')
        .attr('class', 'iconPathClass')
        .append('path')
        .attr('d', function(d) {
          if (d.depth > 0 && d._children) {
            return 'M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z'
          } else if (d.depth > 0 && d.children) {
            return 'M-6 -1 H6 V1 H-6 Z'
          }
        })
        .attr('fill', '#ffffff')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', '0.2')
        .on('click', function(d) {
          if (d.depth > 0) {
            toggle(d)
            drawNodesLinks(d, fn, param)
          }
        })

      enterNodes.append('text')
        .attr('dy', function(d) {
          if (d.depth == 0) {
            return '-1.5em'
          }
          return '0.31em'
        }).attr('x', function(d) {
          if (d.depth == 0) {
            return (d.name + '').length * 8
          }
          return d.x < 180 ? 15 : -15
        }).text(function(d) {
          if (d.name.length > 20) { // 长度超过20的名称,截取显示
            return d.name.substring(0, 9) + ' ...... ' + d.name.substring(d.name.length - 9, d.name.length)
          }
          return d.name
        }).style('text-anchor', function(d) {
          if (d.depth == 0) {
            return 'end'
          }
          return d.x < 180 ? 'start' : 'end'
        }).style('fill-opacity', 0).attr('transform', function(d) {
          if (d.depth > 0) {
            return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) + ')'
          } else {
            return 'rotate(0)'
          }
        }).style('font-size', function(d) {
          if (d.depth == 0) {
          return '20px'
        }
          return '16px'
        }).attr('fill', function(d) {
        if (d.depth == 0 && d.category != null) {
          return colors[d.category % colors.length]
        }
        if (d.depth == 1 && d.category != null) {
          return colors[d.category % colors.length]
        }
        return '#333'
      }).on('click', function(d) {
        // if (d.depth == 0) {
        //   return;
        // }
        if (d.depth == 1) {
          toggle(d)
          drawNodesLinks(d, fn, param)
          return
        }

        if (d.depth != 1 && (d.name == '股东' || d.name == '对外投资')) {
          return
        }

        // 添加文本信息的点击事件
        if (param != null && fn != null && fn instanceof Function) {
          if (param instanceof Array) {
            var arrayP = []
            for (var i = 0; i < param.length; i++) {
              arrayP.push(d[param[i]])
            }
            fn(arrayP)
          } else {
            fn(d[param])
          }
        }
      }).on('mouseover', function(d) {
        if (d.depth != 1 && d.name != '股东' && d.name != '对外投资') {
          d3.select(this).attr('fill', '#1593ed')
        }
      }).on('mouseout', function(d) {
        var color = '#333'
        if (d.depth == 1 && d.category != null) {
          color = 'white'
        }

        d3.select(this).attr('fill', color)
      })

      var updateNodes = nodeUpdate.transition().duration(500).attr(
        'transform', function(d) {
          return 'translate(' + project(d.x, d.y) + ')'
        })
      updateNodes.select('text')
        .style('fill-opacity', 1)
        .attr('transform', function(d) {
          if (d.depth > 0) {
            return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) +
              ')'
          } else {
            return 'rotate(0)'
          }
        })
        .attr('x', function(d) {
          if (d.depth == 0) {
            return (d.name + '').length * 8
          }
          return d.x < 180 ? 20 : -20
        })
        .attr('dx', function(d) {
          var rightDx = 4
          if (d.depth == 1) {
            var wLength = (d.name + '').length
            var n = wLength > 2 ? wLength * 13.5 : (wLength * 13.5 + 10)

            return d.x < 180 ? -n : n
          }
          if (d.depth == 0) {
            rightDx = 10
          }
          return d.x > 180 ? -4 : rightDx
        })
        .attr('dy', function(d) {
          if (d.depth == 0) { // 防止主体公司名称太长，放于顶部
            return -54
          }
          return 5
        })
        .attr('fill', function(d) {
          if (d.depth == 1) {
            return 'white'
          }

          return '#333'
        }).style('text-anchor', function(d) {
          if (d.depth == 0) {
            return 'end'
          }
          return d.x < 180 ? 'start' : 'end'
        })

      updateNodes.select('circle')
        .attr('r', function(d) {
          var radius = 10
          if (d.depth == 0) {
            radius = 45
          }

          if (d.depth == 1) {
            var wLength = (d.name + '').length
            radius = wLength > 1 ? (wLength * 10 + 6) : 26
          }

          d.fr = radius
          return radius
        })

      updateNodes
        .select('path')
        .attr('d', function(d) {
          if (d.depth > 0 && d._children) {
            return 'M-6 -1 H-1 V-6 H1 V-1 H6 V1 H1 V6 H-1 V1 H-6 Z'
          } else if (d.depth > 0 && d.children) {
            return 'M-6 -1 H6 V1 H-6 Z'
          }
        })
        .attr('transform', function(d) {
          if (d.depth == 1) {
            var xPoointer = d.x

            var rotate = 0
            var translate = 'translate(0,0)'
            if ((xPoointer < 90 && xPoointer > 0) || (xPoointer < 270 && xPoointer > 180)) {
              rotate = xPoointer > 90 ? xPoointer - 90 : xPoointer + 90

              if (d.depth > 0 && d._children) {
                translate = xPoointer > 90 ? 'translate(18,12)' : 'translate(6,16)'
              } else if (d.depth > 0 && d.children) {
                translate = xPoointer > 90 ? 'translate(13,16)' : 'translate(4,13)'
              }
              return translate + 'rotate(' + rotate + ')'
            } else if ((xPoointer < 180 && xPoointer > 90) || (xPoointer < 360 && xPoointer > 270)) {
              rotate = xPoointer > 180 ? xPoointer - 270 : xPoointer - 90

              if (d.depth > 0 && d._children) {
                translate = xPoointer > 180 ? 'translate(-12,18)' : 'translate(-20,12)'
              } else if (d.depth > 0 && d.children) {
                translate = xPoointer > 180 ? 'translate(-5,16)' : 'translate(-20,12)'
              }

              return translate + 'rotate(' + rotate + ')'
              // return 'translate(-10,16)' + "rotate(" + rotate + ")";
            } else if (xPoointer % 90 == 0) {
              return 'translate(' + (xPoointer % 180 == 0 ? 18 : 0) + ',' +
                ((xPoointer % 180 == 0 ? 0 : 16)) + ')' +
                'rotate(' + ((xPoointer % 180 == 0 ? 90 : 0)) + ')'
            }
          }
          return 'translate(0,0)'
        })

      var exitNodes = nodeExit.transition().duration(500).attr('transform',
        function(d) {
          return 'translate(' + project(data.x, data.y) + ')'
        }).remove()
      exitNodes.select('circle').attr('r', 0)

      exitNodes.select('text').style('fill-opacity', 0)

      nodes.forEach(function(d) {
        d.x0 = d.x
        d.y0 = d.y
      })

      function toggle(d) {
        if (d.children) {
          d._children = d.children
          d.children = null
        } else {
          d.children = d._children
          d._children = null
        }
      }

      function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI, radius = y
        return [radius * Math.cos(angle), radius * Math.sin(angle)]
      }
    }

    /**
     * 设置图例
     *
     * @param svg
     * @param datas
     * @param colors
     * @param width
     * @param height
     */
    function drawLegendTitle(svg, datas, colors, width, height) {
      var legendData = datas.legendData != null ? datas.legendData : [], legendIsShow = datas.legendIsShow != null ? datas.legendIsShow
        : true
      if (legendIsShow) {
        for (var i = 0; i < legendData.length; i++) {
          var item = svg.append('g')
            .attr(
              'transform',
              'translate(' + (width - 40) + ',' +
              (20 + 20 * i) + ')')
          item.append('rect').attr('width', 24).attr('height', 14).attr(
            'rx', '3').attr('ry', '3').attr('y', '6').attr('fill',
            colors[i]).attr('z-index', '10')
          item.append('text').attr('x', -10).attr('y', '18').text(
            legendData[i]).attr('font-size', '16px').attr(
            'text-anchor', 'end')
        }
      }

      var titleText = datas.titleText != null ? datas.titleText : '', titleIsShow = datas.titleIsShow != null ? datas.titleIsShow
        : true
      if (titleIsShow) {
        var title = svg.append('g').attr('transform',
          'translate(' + width / 2 + ',20)')

        title.append('text').attr('x', 0).attr('y', 0).attr('text-anchor',
          'middle').text(titleText).attr('fill', 'black').attr(
          'font-size', '16px')
      }
    }

    /**
     * 暂定category:
     *        主体，0；
     *        股东，1；
     *        投资公司：2；
     *        子公司：3；
     *        分公司：4
     * @param containerName
     * @param datas
     *{
                data: Nodes,
                legendData: ['主体公司', '股东', '对外投资'],
                legendIsShow: true,
                titleIsShow: true,
                titleText: '关联图谱',
                initZoom: 0.8
                //backgroundColor:'#cccccc'
//width:  1280,//设置svg的宽高，不设置，默认为[1000,800]
//height:  600
             }，其中nodes为
     *
     *Nodes = {
            category: 0,
            name: '主体公司',
            children: [
                {
                    category: 1,
                    name: '股东',
                    children: [
                        {
                            category: 1,
                            name: '股东1',
                            children: [
                                {
                                    category: 1,
                                    name: '法人1',
                                },
                                {
                                    category: 1,
                                    name: '法人2',
                                }
                            ]
                        }
                    ]
                },
                {
                    category: 2,
                    name: '对外投资',
                    children: [
                        {
                            category: 2,
                            name: '上海市邮政公司',
                            children: [
                                {
                                    category: 2,
                                    name: '贵州数据星河大数据产业基地运营管理有限公司',
                                    children: null,
                                },
                                {
                                    category: 2,
                                    name: '安徽中康大数据有限公司',
                                    children: null,
                                },
                                {
                                    category: 2,
                                    name: '山东淮数大数据产业发展有限公司',
                                    children: null,
                                },
                                {
                                    category: 2,
                                    name: '云南彩云大数据产业发展有限公司',
                                    children: null,
                                }
                            ]
                        }
                    ]
                },
            ]
        };
     * @param param，设置点击事件以及所需参数等，
     var params = {
            'clickFn': fn,//点击事件，处理函数
            'clickParam': 'id'//点击事件，所需获取参数
        };
     */
    function draw(containerName, datas, param) {
      if (param != null && param.clickFn != null && (param.clickFn instanceof Function)) {
        drawD3Cluster(containerName, datas, param.clickFn, (param.clickParam || 'name'))
      } else {
        drawD3Cluster(containerName, datas)
      }
    }

    exports.version = version
    exports.draw = draw
  }
)

