import torch
torch.backends.cuda.matmul.allow_tf32 = True
torch.backends.cuda.matmul.allow_fp16_reduced_precision_reduction = True
torch.cuda.empty_cache()
from discoart import create

# da = create(text_prompts='A painting of sea cliffs in a tumultuous storm, Trending on ArtStation.',
#        init_image='https://d2vyhzeko0lke5.cloudfront.net/2f4f6dfa5a05e078469ebe57e77b72f0.png',
#        skip_steps=100)

# da = create(text_prompts='A painting of sea cliffs in a tumultuous storm, Trending on ArtStation.', batch_size=2, n_batches=1, steps=512, width_height=[512, 512])

# da = create(text_prompts='two galleon stranded on a sea of flowers, sunset, dusk, 4k, light effect, rain, by marc simonetti.', batch_size=1, n_batches=24, steps=500, width_height=[1280, 720])

# da = create(text_prompts='A castle stranded on sea of flowers, cyberpunk, sunset, dusk, 4k, light effect, rain, by marc simonetti.', batch_size=1, n_batches=24, steps=500, width_height=[1280, 720])

# da = create(text_prompts='A beauty took a lighted boat through a dark forest, and you could vaguely see the twinkling fireflies on the trees, sunset, dusk, 4k, light effect, by marc simonetti.', batch_size=1, n_batches=24, steps=500, width_height=[1280, 720])

# da = create(text_prompts='A epic CG matte painting,a boat in brook,dark forest,sea of flowers,flying dusk,light spot,light effect,hight-definition picture,Unreal Engine,artstation', batch_size=1, n_batches=24, steps=350, clip_guidance_scale=20000, width_height=[1280, 720])

# da = create(text_prompts='A epic CG matte painting,brook,dark forest,stone path,sea of flowers,flying dusk,light spot,light effect,hight-definition picture,Unreal Engine,artstation', batch_size=1, n_batches=54, steps=300, text_clip_on_cpu=True, save_rate=50, clip_guidance_scale=20000, width_height=[1280 * 0.7, 720 * 0.7])

# da = create(text_prompts='A epic CG matte painting,brook,dark forest,stone path,sea of flowers,flying dusk,light spot,light effect,hight-definition picture,Unreal Engine,artstation', batch_size=1, n_batches=54, steps=300, text_clip_on_cpu=True, save_rate=50, clip_guidance_scale=20000, width_height=[1280 * 0.7, 720 * 0.7])

# da = create(text_prompts=['Magnificent and fantastic landscape,countryside in japan,big scene,summer,here is some farmland,blue sky and white clouds,there are some Japanese country buildings,lots of plants,some mountains in the distance,sea of flowers,flying dusk,light spot,light effect,hight-definition picturelight effect, unreal engine, WLOP, Artstation.', "Ghibli,Miyazaki Hayao,Makoto Shinkai"], batch_size=1, n_batches=64, steps=300, text_clip_on_cpu=True, display_rate=0, save_rate=25, clip_guidance_scale=15000, width_height=[1920, 1080], cutn_batches=2, gif_fps=-1)

# da = create(text_prompts=['Magnificent and fantastic landscape,countryside in japan,big scene,summer,here is some farmland,blue sky and white clouds,there are some Japanese country buildings,lots of plants,some mountains in the distance,sea of colorful flowers,sunset,flying dusk,light spot,light effect,hight-definition picture, unreal engine, WLOP, Artstation.', "Ghibli,Miyazaki Hayao,Makoto Shinkai"], batch_size=1, n_batches=128, steps=325, text_clip_on_cpu=True, display_rate=0, save_rate=25, clip_guidance_scale=7000, width_height=[1280, 720], cutn_batches=2, gif_fps=-1)
da = create(text_prompts=['Magnificent and fantastic landscape,countryside in japan,big scene,summer,here is some farmland,blue sky and white clouds,there are some Japanese country buildings,lots of plants,some mountains in the distance,sea of colorful flowers,sunset,flying dusk,light spot,light effect,hight-definition picture, unreal engine, WLOP, Artstation.', "Ghibli,Miyazaki Hayao,Makoto Shinkai"], batch_size=1, n_batches=128, steps=325, text_clip_on_cpu=True, display_rate=1, save_rate=25, clip_guidance_scale=5000, width_height=[1280 * 0.7, 720 * 0.7], cutn_batches=2, gif_fps=-1)
# ["Magnificent and fantastic landscape, Crystal Cave, epic,many colorful crystals and gems,fairy tale,light effect,puddles,Dream,Greg Rutkowski, unreal engine, James Gurney, WLOP, Artstation","colorful scheme"]

# da = create(text_prompts='A epic CG matte painting,expansive view,In a huge cave,Stone pavilion,bluestone path,brook,flying dust,light spot,light effect,by Zeen Chin,hight-definition picture,Unreal Engine,artstation', batch_size=1, n_batches=32, steps=400, clip_guidance_scale=20000, width_height=[1920 * 0.8, 1080 * 0.8])

da = create(text_prompts=["Magnificent and fantastic landscape, vertical, Blooming roses, desert, sunny, blue sky and white clouds"], batch_size=1, n_batches=128, steps=325, text_clip_on_cpu=True, display_rate=1, save_rate=25, clip_guidance_scale=5000, width_height=[1280 * 0.7, 720 * 0.7], cutn_batches=2, gif_fps=-1)
da = create(text_prompts=["Winter, very cold wind, vertical, withered trees, snow, an old wooden house"], batch_size=1, n_batches=128, steps=325, text_clip_on_cpu=True, display_rate=1, save_rate=25, clip_guidance_scale=5000, width_height=[1280 * 0.7, 720 * 0.7], cutn_batches=2, gif_fps=-1)

# from discoart.config import save_config_svg
# save_config_svg(da, 'my.svg')


# 例如，“一幅美丽的奇异灯塔画作，它的光芒照耀在汹涌的血海中，由 greg rutkowski 和 thomas kinkade 创作，在 artstation 上流行。”

# 请注意，这个提示大致遵循一个结构：[主题]、[介词细节]、[设置]、[元修饰符和艺术家]；

'Greg ratkowski, night, a little red rose on the iron frame, art station trend, low light, smoke, steel support, volume lighting, UE4, ZBrush, marmoset Kit HD'

'Super wide angle view, red rose garden + beautiful paintings inthe factory area, tall factory with many iron frames, Iron nets, factory lighting'

'a beautiful painting of a waterlily pond by Pierre Bonnard, Trending on artstation'