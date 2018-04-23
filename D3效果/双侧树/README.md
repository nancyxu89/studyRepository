1 d3.layout.tree().size([height,width])，以svg高度为树图的宽度；
2 nodes偏移位置，x=w/2-d.y ; y=d.x(左侧)；x=w/2+d.y; y = d.x(右侧)
3 links计算
  var source = {}
                    var target = {}
                    if (that.isParent(d.target)) {
                        source = getRightPos(d.target)
                        target = getRightPos(d.source)
                    } else {
                        source = getRightPos(d.source)
                        target = getRightPos(d.target)
                    }

                    function getRightPos(d) {
                        if (that.isParent(d)) {
                            return {y: (w / 2 - d.y), x: d.x, name: d.name}
                            // return {x: (w / 2 - d.y), y: d.x, name: d.name}
                        } else {
                            return {y: (w / 2 + d.y), x: d.x, name: d.name}
                            // return {x: (w / 2 + d.y), y: d.x, name: d.name}
                        }
                    }

                    return "M" + source.y + "," + source.x
                        + "C" + (source.y + target.y) / 2 + "," + source.x
                        + " " + (source.y + target.y) / 2 + "," + target.x
                        + " " + target.y + "," + target.x;

4 目前比较粗糙，待完善