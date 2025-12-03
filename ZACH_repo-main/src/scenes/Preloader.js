export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        //
        //WORLD OBJECTS
        //
        this.load.image('levelBackground', 'levelBackground.png');
        this.load.image('base1','base1.png');
        this.load.image('base2','base2.png');
        this.load.image('base2small','base2small.png');
        this.load.image('base3','base3.png');
        this.load.image('base4','base4.png');
        this.load.image('base5','base5.png');
        this.load.image('base6','base6.png');
        this.load.image('base7','base7.png');
        this.load.image('ladderLongLvl1', 'ladderLongLvl1.png');



        this.load.json('slope135Shapes', 'slope135.json');
        this.load.image('slope135', 'slope135.png');
        this.load.image('slope135Invis', 'slope135Invis.png');

        this.load.image('buttonSide', 'buttonSide.png');
        this.load.image('buttonSidePressed', 'buttonSidePressed.png');

        //
        //PLAYER SPRITES AND SPRITESHEETS
        //

        this.load.image('knight', 'knightDemo.png');
        this.load.spritesheet(
            'dude',
            'dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
        this.load.spritesheet(
                    'dudePrincess',
                    'dudePrincess.png',
                    {frameWidth: 32, frameHeight: 48}
                );
        this.load.image('dudeCrouchRight', 'dudeCrouchRight.png');
        this.load.image('dudeCrouchLeft', 'dudeCrouchLeft.png');
        this.load.image('dudeCPRight', 'dudeCrouchPrincessRight.png');
        this.load.image('dudeCPLeft', 'dudeCrouchPrincessLeft.png');

        //
        //PRINCESS SPRITES
        //

        this.load.image('princess', 'princessDemo.png');
        this.load.image('princessAirLeft', 'princessAirLeft.png');
        this.load.image('princessAirRight', 'princessAirRight.png');
        this.load.image('princessBounceLeft', 'princessBounceLeft.png');
        this.load.image('princessBounceRight', 'princessBounceRight.png');

        //Title Screen
        this.load.image('titleBG', 'titleBackground.png');
        this.load.image('startButton', 'startButton.png');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Title');
    }
}
