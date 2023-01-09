class Example extends Phaser.Scene {
    t = {
        x: -0.03490658503988659,
        y: 0.05235987755982989,
        z: -0.05235987755982989
    };

    graphics;
    edge0 = [0, 1];
    edge1 = [1, 3];
    edge2 = [3, 2];
    edge3 = [2, 0];
    edge4 = [4, 5];
    edge5 = [5, 7];
    edge6 = [7, 6];
    edge7 = [6, 4];
    edge8 = [0, 4];
    edge9 = [1, 5];
    edge10 = [2, 6];
    edge11 = [3, 7];
    edges = [this.edge0, this.edge1, this.edge2, this.edge3, this.edge4, this.edge5, this.edge6, this.edge7, this.edge8, this.edge9, this.edge10, this.edge11];
    node0 = [-100, -100, -100];
    node1 = [-100, -100,  100];
    node2 = [-100,  100, -100];
    node3 = [-100,  100,  100];
    node4 = [ 100, -100, -100];
    node5 = [ 100, -100,  100];
    node6 = [ 100,  100, -100];
    node7 = [ 100,  100,  100];
    nodes = [this.node0, this.node1, this.node2, this.node3, this.node4, this.node5, this.node6, this.node7];

    create() {
        this.graphics = this.add.graphics({x: 400, y: 300});

        this.rotateZ3D(0.5235987755982988);
        this.rotateY3D(0.5235987755982988);
        this.rotateX3D(0.5235987755982988);

        TweenMax.to(this.t, 6, {
            x: 0.03490658503988659,
            ease: Sine.easeInOut,
            repeat: -1,
            yoyo: true
        });

        TweenMax.to(this.t, 4, {
            y: -0.05235987755982989,
            ease: Sine.easeInOut,
            repeat: -1,
            yoyo: true
        });

        TweenMax.to(this.t, 8, {
            z: 0.05235987755982989,
            ease: Sine.easeInOut,
            repeat: -1,
            yoyo: true
        });
    }

    update() {
        this.rotateX3D(this.t.x);
        this.rotateY3D(this.t.y);
        this.rotateZ3D(this.t.z);

        this.graphics.clear();

        this.graphics.lineStyle(2, 0x00ff00, 1.0);

        this.graphics.beginPath();

        for (let e = 0; e < this.edges.length; e++)
        {
            const n0 = this.edges[e][0];
            const n1 = this.edges[e][1];
            const node0 = this.nodes[n0];
            const node1 = this.nodes[n1];

            this.graphics.moveTo(this.node0[0], this.node0[1]);
            this.graphics.lineTo(this.node1[0], this.node1[1]);
        }

        this.graphics.closePath();
        this.graphics.strokePath();
    }

    rotateZ3D(theta) {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.nodes.length; n++)
        {
            const node = this.nodes[n];
            const x = node[0];
            const y = node[1];

            node[0] = x * tc - y * ts;
            node[1] = y * tc + x * ts;
        }
    }

    rotateY3D(theta) {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.nodes.length; n++)
        {
            const node = this.nodes[n];
            const x = node[0];
            const z = node[2];

            node[0] = x * tc - z * ts;
            node[2] = z * tc + x * ts;
        }
    }

    rotateX3D(theta) {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.nodes.length; n++)
        {
            const node = this.nodes[n];
            const y = node[1];
            const z = node[2];

            node[1] = y * tc - z * ts;
            node[2] = z * tc + y * ts;
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
