class Example extends Phaser.Scene {
    dude2;
    dude;
    context;
    newTexture;
    originalTexture;

    preload() {
        this.load.image('dude', 'assets/sprites/phaser-dude.png');
    }

    create() {
        this.originalTexture = this.textures.get('dude').getSourceImage();

        const newTexture = this.textures.createCanvas('dude_new', this.originalTexture.width, this.originalTexture.height);

        this.context = this.newTexture.getSourceImage().getContext('2d');

        this.context.drawImage(this.originalTexture, 0, 0);

        this.dude = this.add.image(100, 100, 'dude');
        this.dude2 = this.add.image(200, 100, 'dude_new');

        this.createSilhouette();
    }

    createSilhouette() {
        const pixels = this.context.getImageData(0, 0, this.originalTexture.width, this.originalTexture.height);

        for (i = 0; i < pixels.data.length / 4; i++)
        {
            this.processPixel(pixels.data, i * 4, 0.1);
        }

        this.context.putImageData(pixels, 0, 0);
    }

    processPixel(data, index) {
        data[index] = 255;
        data[index + 1] = 0;
        data[index + 2] = 0;
    }
}

const config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    scene: Example,
    width: 800,
    height: 600
};

const game = new Phaser.Game(config);