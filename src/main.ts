import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    canvas.width = window.visualViewport!.width;
    canvas.height = window.visualViewport!.height;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    let colour: string;
    let size: number;
    let activePointerIds: number[] = [];

    const button_color_black = document.querySelector<HTMLButtonElement>(
        '#button_color_black',
    )!;
    const button_color_red =
        document.querySelector<HTMLButtonElement>('#button_color_red')!;
    const button_color_green = document.querySelector<HTMLButtonElement>(
        '#button_color_green',
    )!;
    const button_color_yellow = document.querySelector<HTMLButtonElement>(
        '#button_color_yellow',
    )!;
    const button_color_blue =
        document.querySelector<HTMLButtonElement>('#button_color_blue')!;
    const button_color_white = document.querySelector<HTMLButtonElement>(
        '#button_color_white',
    )!;
    const previewElement = document.querySelector<HTMLDivElement>('#preview')!;
    const input_size = document.querySelector<HTMLInputElement>('#input_size')!;

    const changeColour = (newColour: string): void => {
        colour = newColour;
        ctx.fillStyle = newColour;
    };
    const changeSize = (newSize: number): void => {
        size = newSize;
    };
    const updatePreview = (): void => {
        previewElement.style.width = `${size}px`;
        previewElement.style.height = `${size}px`;
        previewElement.style.backgroundColor = colour;
    };
    const draw = (size: number, x: number, y: number): void => {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
    };

    // Initialize options
    changeColour('red');
    changeSize(10);
    updatePreview();

    button_color_black.addEventListener('click', () => {
        changeColour('black');
        updatePreview();
    });
    button_color_red.addEventListener('click', () => {
        changeColour('red');
        updatePreview();
    });
    button_color_green.addEventListener('click', () => {
        changeColour('green');
        updatePreview();
    });
    button_color_yellow.addEventListener('click', () => {
        changeColour('yellow');
        updatePreview();
    });
    button_color_blue.addEventListener('click', () => {
        changeColour('blue');
        updatePreview();
    });
    button_color_white.addEventListener('click', () => {
        changeColour('white');
        updatePreview();
    });

    input_size.addEventListener('change', (e) => {
        changeSize(parseInt((e.target as HTMLInputElement).value));
        updatePreview();
    });

    // This works on everything I tried except for Firefox Android. For some
    // reason a second touch pointer stops after the first 'pointermove' and no
    // more events seem to come for that pointer. Not sure if that's a mistake
    // I've made or something wrong with FF Android specifically. Maybe need to
    // experiment with https://patrickhlauke.github.io/touch/ on FF Android to
    // see if not all expected events are received.
    canvas.addEventListener('pointerdown', (e) => {
        activePointerIds.push(e.pointerId);
        draw(size, e.offsetX, e.offsetY);
    });
    canvas.addEventListener('pointermove', (e) => {
        if (activePointerIds.includes(e.pointerId)) {
            draw(size, e.offsetX, e.offsetY);
        }
    });
    canvas.addEventListener('pointerup', (e) => {
        activePointerIds = activePointerIds.filter((el) => el !== e.pointerId);
    });

    // Stop touch events on the canvas from scrolling the page
    canvas.addEventListener(
        'touchstart',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );

    canvas.addEventListener(
        'touchmove',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );
});
