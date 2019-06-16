/**
 * containerId 容器id
 * options 配置项信息
 */
export default class Mark {
    ctx = null;
    originData = null;
    width = null;
    height = null;
    cvs = null;
    scaleX = 1;
    scaleY = 1;
    constructor(containerId, options) {
            this.containerId = containerId;
            this.options = options;
            this.init(options);
        }
        // 初始化画布
    init({
            width,
            height,
            originWidth,
            originHeight,
            originData,
        }) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            this.scaleX = width / originWidth;
            this.scaleY = height / originHeight;
            this.originData = originData;
            this.width = width;
            this.height = height;
            this.cvs = canvas;
            document.getElementById(this.containerId).appendChild(canvas);
            this.ctx = canvas.getContext('2d');
            this.drawRects(originData);
        }
        // 画长方形标记
    drawRects(originData) {
            const defWidth = this.options.strokeWidth;
            const defColor = this.options.strokeColor;
            originData.forEach(({
                x,
                y,
                width,
                height,
                lineWidth = defWidth,
                color = defColor,
            }) => {
                this.ctx.lineWidth = lineWidth;
                this.ctx.strokeStyle = color;
                this.ctx.strokeRect(
                    x * this.scaleX,
                    y * this.scaleY,
                    width * this.scaleX,
                    height * this.scaleY,
                );
            });
        }
        // 清空画布
    clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        // 刷新画布
    redraw(originData) {
            this.clear();
            this.drawRects(originData);
        }
        // 图形缩放
    scale(w, h) {
        this.cvs.width = w;
        this.width = w;
        this.cvs.height = h;
        this.height = h;
        this.scaleX = w / this.options.originWidth;
        this.scaleY = h / this.options.originHeight;
        this.redraw(this.originData);
    }
}