import os
from pathlib import Path


def merge() -> None:
    """Объединяет файлы из envs и создает .env файл"""
    base_dir = Path(__file__).parent.parent.resolve()
    dotenvs_dir = base_dir / "envs"
    output_file = base_dir / ".env"
    build_env = os.environ.get("BUILD_ENVIRONMENT", "local")
    files = []
    if build_env == "local":
        files = [dotenvs_dir / ".env.dev"]
    elif build_env == "production":
        files = [
            dotenvs_dir / ".env.prod",
            dotenvs_dir / ".env.prod.db",
        ]

    merged_content = ""
    for merge_file in files:
        merged_content += merge_file.read_text()
        merged_content += os.linesep
    output_file.write_text(merged_content)


if __name__ == "__main__":
    merge()
