export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

      create() {
        // Background
        this.add.image(0, 0, 'endscreen').setOrigin(0);
            

        // Start Button
        const restartBtn = this.add.image(this.scale.width / 2, 500, 'restart')
            .setInteractive()
            .setScale(1);

        restartBtn.on('pointerdown', () => {
            this.scene.start('Game');  // Go to main gameplay
        });
    }
}
