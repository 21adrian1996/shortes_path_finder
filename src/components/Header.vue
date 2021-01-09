<template>
  <div>
    <nav class="fixed w-full bg-white top-0 py-3 shadow-lg">
      <div class="container px-4 mx-auto flex">
        <div class="block w-auto text-gray-800">
          <i class="fas fa-map-signs"></i>
          <a class="ml-3 text-sm font-bold inline-block py-2 uppercase" href="/">
            Shortest Path Finder
          </a>
        </div>
        <div class="lg:flex flex-grow hidden">
          <ul class="lg:ml-auto">
            <li class="nav-item text-gray-700 hover:text-gray-500">
              <a class="px-3 py-2 flex text-xs uppercase font-bold"
                 href="https://github.com/21adrian1996/shortes_path_finder"
                 target="_blank">
                <i class="mr-2 fab fa-github text-lg leading-lg"></i>
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>
