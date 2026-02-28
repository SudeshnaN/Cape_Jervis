import os
import sys
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(''))
load_dotenv('/app/backend/.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

def generate_vineyard_video():
    """Generate vineyard drone shot video with wine pouring"""
    video_gen = OpenAIVideoGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
    
    prompt = """Aerial drone shot flying slowly over beautiful green vineyard rows at sunset golden hour. 
    Gentle camera movement revealing rolling hills with grapevines. Cinematic nature landscape, 
    warm sunlight, peaceful atmosphere, professional documentary style cinematography."""
    
    output_path = '/app/frontend/public/vineyard-video.mp4'
    
    print("🎬 Starting video generation with Sora 2...")
    print(f"📝 Prompt: {prompt[:100]}...")
    
    video_bytes = video_gen.text_to_video(
        prompt=prompt,
        model="sora-2",
        size="1280x720",
        duration=8,
        max_wait_time=600
    )
    
    if video_bytes:
        video_gen.save_video(video_bytes, output_path)
        print(f'✅ Video saved to: {output_path}')
        return output_path
    else:
        print('❌ Video generation failed')
        return None

if __name__ == "__main__":
    result = generate_vineyard_video()
