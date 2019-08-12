import query from "@amoy/query"

const ext = {};

['appendTo', 'append', 'before', 'after', 'insertBefore', 'insertAfter', 'remove', 'removeChild'].map((name: string) => {
    ext[name] = function(this: any, element: any) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].layout) {
                this[i][name](element)
            }
        }
    }
})

ext['update'] = function(this: any, style: any) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].layout) {
            this[i].updateLayout(style)
        }
    }
};

(query as any).extend(ext)
