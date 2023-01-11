class Example extends Phaser.Scene {
    assert = (message, condition) => {
        this.totalTests++;
        if (condition) this.testsPassed++;
        console.assert(condition, message)
    };

    testsPassed = 0;
    totalTests = 0;

    preload() {
        this.load.tilemapTiledJSON('desert', 'assets/tilemaps/maps/desert.json');
        this.load.image('desert-tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');

        this.load.tilemapTiledJSON('mario', 'assets/tilemaps/maps/super-mario.json');
        this.load.image('SuperMarioBros-World1-1', 'assets/tilemaps/tiles/super-mario.png');

        this.load.tilemapTiledJSON('features-test', 'assets/tilemaps/maps/features-test.json');
        this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.load.image('dangerous-kiss', 'assets/tilemaps/tiles/dangerous-kiss.png');
        this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
        this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
    }

    create() {
        // Visual test to make sure tiles are culled properly when factoring in:
        // - Layer position
        // - Scroll factor
        // - Layer scale
        // - Maps that have multiple tilesizes
        {
            // Static map with offset, scroll factor & scale
            let map = this.make.tilemap({ key: 'desert' });
            let tiles = map.addTilesetImage('Desert', 'desert-tiles', 32, 32, 1, 1);
            let layer = map.createLayer(0, tiles, -300, -400);
            layer.setScrollFactor(0.25);
        }

        {
            // Dynamic map with offset, scroll factor & scale
            let map = this.make.tilemap({ key: 'mario' });
            let tiles = map.addTilesetImage('SuperMarioBros-World1-1');
            let layer = map.createLayer(0, tiles, 50, -25);
            layer.setScrollFactor(1);
            layer.setScale(2, 0.5);
        }

        {
            // Map with multiple tileset sizes
            let map = this.make.tilemap({ key: 'features-test' });
            let ground_1x1 = map.addTilesetImage('ground_1x1');
            let tiles2 = map.addTilesetImage('tiles2');
            let dangerousTiles = map.addTilesetImage('dangerous-kiss');
            let layer = map.createLayer('Tile Layer 1', ground_1x1, 0, 300);
            let layer2 = map.createLayer('Offset Tile Layer', tiles2, 0, 300);
            let layer3 = map.createLayer('Small Tile Layer', dangerousTiles, 300, 300).setScrollFactor(0.5);
        }

        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    }

    update(time, delta) {
        controls.update(delta);
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 800,
    backgroundColor: '#2d2d88',
    parent: 'phaser-example',
    pixelArt: true,
    scene: Example
};

const game = new Phaser.Game(config);
